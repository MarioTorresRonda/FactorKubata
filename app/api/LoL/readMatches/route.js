import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { MatchPlayerChamps } from '@/util/trimmedObjs';
import { NextResponse } from 'next/server';

const baseAggregation = { 
  matchId : 1, 
  "metadata.participants" : 1,
  "info.teams" : 1,
}

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const matchQuery = searchParams.get('matchList');
    const puuid = searchParams.get('puuid');
    const matchList = matchQuery.split(";");

    if ( matchList.join("") == "" ) {
      return NextResponse.json( { message : "MatchList empty" }, {status: 400});
    }

    const matchesCollection = await getCollection("matches");  

    let aggregation = [ {
        $match: { matchId : { $in: matchList } } 
    } ];

    if ( puuid != "" ) {
      aggregation.push( { $project : { 
        ...baseAggregation,
        "info.participants" : {
        $filter: {  
          input: "$info.participants",
          as: "participant",
          cond: {
            $eq: [
              "$$participant.puuid",
              puuid 
            ]
          }
        },
      } } } );
    }

    aggregation.push( {
      $project : { ...baseAggregation, "info.participants.championId" : 1, "info.participants.teamPosition" : 1 }
    } )


    let findMatches = await matchesCollection.aggregate( aggregation );

    const matches = []
    const notFetchedMatches = matchList.reduce((acc,curr)=> (acc[curr]=true,acc),{})
    for await (const match of findMatches) {
      if ( puuid ) {
        if ( match.info.teams[0].bans.length > 0 ) {
          try{ 
            const pickTurn = match.metadata.participants.findIndex( participant => participant == puuid ) + 1;
            const allBans = [ ...match.info.teams[0].bans, ...match.info.teams[1].bans ];
            const banId = allBans.find( ban => ban.pickTurn == pickTurn ).championId;
            if ( banId && banId != -1 ) {
              match.info.participants[0].banId = banId;
            }
          }catch( e ) {
            //console.log( match.info.teams[0].bans, match.info.teams[1].bans, e.message );
          }
        }
      };
      match.metadata = undefined;
      match.info.teams = undefined;

      matches.push( match );
      delete notFetchedMatches[match.matchId];
    }

    for (const matchId in notFetchedMatches ) {
      const newMatch = await addMatch( matchesCollection, matchId );
      if ( newMatch ) {
        delete notFetchedMatches[matchId];
        if ( newMatch.matchId ) {
          matches.push( newMatch );
        }
      }else{ 
        break;
      }
    }

    const result = {
      matches,
      notFetched: Object.keys( notFetchedMatches )
    }

  return NextResponse.json( result, {status: 200});
}

async function addMatch( matchesCollection, matchId ) {
  
      const api = readSecrets( keys.lol );
      let data = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api}`)
      let matchJSON = await data.json();
      
      if ( !matchJSON.info ) {
        if (  matchJSON.status.status_code == 404  ) {
          return true;
        }
        return false;
      }
      matchJSON.matchId = matchId;
      try{
        await matchesCollection.insertOne( matchJSON );
      }catch( e ) {
        return false;
      }
      matchJSON.info.participants = matchJSON.info.participants.map( participant =>  new MatchPlayerChamps( participant ) );
      return matchJSON;
}