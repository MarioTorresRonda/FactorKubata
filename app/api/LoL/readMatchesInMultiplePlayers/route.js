import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
  const searchParams = request.nextUrl.searchParams;
  const teamName = decodeURIComponent( searchParams.get('teamName') );
  const onlyAsFive = searchParams.get('onlyAsFive') == 1;  

  let teamsCollection = await getCollection("teams");
  let team = await teamsCollection.findOne( { teamName : teamName } );
  if ( !team ) {
    return NextResponse.json( { message: "Team does not exists" }, {status: 400});
  }

  const playersCollection = await getCollection("players"); 
  const players = await Promise.all( Object.values( team.players ).map( async ( player ) => {
    const { matches } = await playersCollection.findOne( { gameName: player.name, tagLine : player.tag }, { _id: 0, matches: 1 } )
    player.matchList = matches;
    return {...player};
  } ) )

  const allMatchIds = {}
  players.forEach( ( player )  => {
    player.matchList.forEach( matchId => {
      if ( allMatchIds[matchId] ) {
        allMatchIds[matchId]++;
      }else{
        allMatchIds[matchId] = 1;
      }
    } )
  });

  const allMatchIdsArray = Object.keys( allMatchIds ).map( ( key ) => { return { id: key, count: allMatchIds[key] } } );
  allMatchIdsArray.sort( (a,b) => b.count - a.count );
  let matchIds = [];
  allMatchIdsArray.forEach( ( matchIdObj ) => {
    if ( matchIdObj.count >= ( onlyAsFive ? players.length : 2 ) ) {
      matchIds.push( matchIdObj.id );
    }
  } );
  
  return NextResponse.json( matchIds, {status: 200});
}