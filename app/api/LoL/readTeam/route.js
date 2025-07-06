import { getCollection } from '@/util/mongoDB';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const teamName = decodeURIComponent( searchParams.get('teamName') );
    const playerSearch = decodeURIComponent( searchParams.get('playerSearch') );

    try{

      let teamsCollection = await getCollection("teams");
      let team = await teamsCollection.findOne( { teamName : teamName } );
      if ( team && playerSearch != "null" && playerSearch != "undefined" && playerSearch != "" && playerSearch ) {
        return new Response( JSON.stringify( { message: "Team already exist"} ), {status: 400});
      }
      if ( !team ) {
        let json = playerSearch;

        if ( !json || json.length == 0 || json == "null" || json == "undefined" ) {
          return new Response( JSON.stringify( { message: "Team does not exist"} ), {status: 400});
        }

        team = {};
        team.players = JSON.parse( json );
        team.teamName = teamName;
        await teamsCollection.insertOne( team );
      }
      
      return new Response( JSON.stringify( team ), {status: 200});
    }catch( e ) {
      return new Response( e, {status: 400});
    }
}