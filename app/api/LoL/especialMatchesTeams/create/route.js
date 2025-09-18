import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json( "This method have to be accessed by POST", {status: 405});
}

export async function POST(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    const body = await request.json();
    const name = body.name;
    const players = body.players;
    const image = body.image;

    const pass = readSecrets( keys.password );

    try{      
      
        if ( pass != token ) {
            return NextResponse.json( { message: "User don't have enough permissions"}, {status: 400});
        }

        if ( name == null || typeof name != "string" || name.trim() == "" ) {
            return NextResponse.json( { message: "Name is empty or not correct"}, {status: 400});
        }
        if ( name.length > 50 ) {
            return NextResponse.json( { message: "Name can not be longer than 50 characters"}, {status: 400});
        }

        if ( !Array.isArray( players ) || players.length == 0 ) {
            return NextResponse.json( { message: "games is empty or have 0 games inside"}, {status: 400});
        }
        if ( image.length > 1000000 ) {
            return NextResponse.json( { message: "Image can not be bigger than 1Mb"}, {status: 400});
        }
        
        let errorPlayers = null;
        players.some( ( player, index ) =>  {
          if ( !player.name || player.name.trim() == ""  ) {
            errorPlayers = NextResponse.json( { message: `player ${index+1} have empty name.`}, {status: 400});
            return true;
          }
          if ( !player.uuid || player.uuid.trim() == "" ) {
            errorPlayers = NextResponse.json( { message: `game ${index+1} have empty uuid.`}, {status: 400});
            return true;
          }
        } );
        if ( errorPlayers ) {
          return errorPlayers;
        }

      let especialTeamsCollection = await getCollection("especialMatchesTeams");
      const _id = (await especialTeamsCollection.insertOne( { name, players, image } )).insertedId;
      
      return NextResponse.json( { result: true, _id }, {status: 200});
    }catch( e ) {
      return NextResponse.json( { result: false, message: e.message }, {status: 400});
    }
}