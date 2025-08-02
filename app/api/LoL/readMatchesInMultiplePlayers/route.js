import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
  const searchParams = request.nextUrl.searchParams;
  const teamName = decodeURIComponent( searchParams.get('teamName') );

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

  let matchIds = [];
  Object.keys( allMatchIds ).forEach( ( matchId ) => {
    if ( allMatchIds[matchId] > 1 ) {
      matchIds.push( matchId );
    }
  } );

  matchIds = matchIds.sort( (a, b) => {
    const trimmedA = Number( a.substr( "EUW1_".length ) );
    const trimmedB = Number( b.substr( "EUW1_".length ) );
    return trimmedB - trimmedA;
  } );
  
  return NextResponse.json( matchIds, {status: 200});
}