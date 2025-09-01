import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json( "This method have to be accessed by POST", {status: 405});
}

export async function POST(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    const body = request.json();
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

      if ( players == null || !Array.isArray( players ) ) {
          return NextResponse.json( { message: "Players list is empty or not correct"}, {status: 400});
      }

      if ( players.length <= 5 ) {
          return NextResponse.json( { message: "Players list have less than 5 players"}, {status: 400});
      }

      let especialMatchesTeamsCollection = await getCollection("especialMatchesTeams");
      await especialMatchesTeamsCollection.insertOne( { name: body.name, players: body.players, image: body.image } );
        
      return NextResponse.json( { result: true }, {status: 200});
    }catch( e ) {
      return NextResponse.json( e, {status: 400});
    }
}