import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json( "This method have to be accessed by POST", {status: 405});
}

export async function POST(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    const body = request.json();
    const date = body.date;
    const name = body.name;
    const games = body.games;

    const pass = readSecrets( keys.password );

    try{
        
        if ( pass != token ) {
            return NextResponse.json( { message: "User don't have enough permissions"}, {status: 400});
        }

        if ( date == null || typeof date.getMonth() != 'function' || Number.isNaN( date.getMonth ) ) {
            return NextResponse.json( { message: "Date is empty or not correct"}, {status: 400});
        }
        
        if ( name == null || typeof name != "string" || name.trim() == "" ) {
            return NextResponse.json( { message: "Name is empty or not correct"}, {status: 400});
        }
        if ( name.length > 50 ) {
            return NextResponse.json( { message: "Name can not be longer than 50 characters"}, {status: 400});
        }

        if ( !Array.isArray( games ) || games.length == 0 ) {
            return NextResponse.json( { message: "games is empty or have 0 games inside"}, {status: 400});
        }
        
        games.forEach( ( game, index ) =>  {
          if (  !game.blue || !game.red  ) {
            return NextResponse.json( { message: `game ${index} have no blue or red team.`}, {status: 400});
          }
          if ( !game.info ) {
            return NextResponse.json( { message: `game ${index} have empty data.`}, {status: 400});
          }
        } )

      let especialMatchesCollection = await getCollection("especialMatches");
      await especialMatchesCollection.insertOne( body );
      
      return NextResponse.json( team, {status: 200});
    }catch( e ) {
      return NextResponse.json( e, {status: 400});
    }
}