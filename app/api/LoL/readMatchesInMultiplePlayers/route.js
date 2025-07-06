import { getCollection } from '@/util/mongoDB';

export async function GET(request) {
  
  const searchParams = request.nextUrl.searchParams;
  const teamName = decodeURIComponent( searchParams.get('teamName') );

  let teamsCollection = await getCollection("teams");
  let team = await teamsCollection.findOne( { teamName : teamName } );
  if ( !team ) {
    return new Response( "Team does not exists", {status: 400});
  }

  const playersCollection = await getCollection("players"); 
  const players = await Promise.all( Object.values( team.players ).map( async ( player ) => {
    const { puuid } = await playersCollection.findOne( { gameName: player.name, tagLine : player.tag }, { _id: 0, puuid: 1 } )
    player.puuid = puuid;
    return {...player};
  } ) )

  const matchIds = []
  const matchesCollection = await getCollection("matches"); 
  const matchesFound = await matchesCollection.aggregate([
    {
      $match: { "metadata.participants" : { $all : players.map( player => player.puuid ) } }
    }
  ]);
  for await (const match of matchesFound) {
      matchIds.push(match.matchId);
  }
  
  return new Response( JSON.stringify( matchIds ), {status: 200});
}