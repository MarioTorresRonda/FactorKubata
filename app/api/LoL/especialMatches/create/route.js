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
    const date = body.date;
    const scrim = body.scrim;
    const games = body.games;

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

      if ( date == null  ) {
          return NextResponse.json( { message: "Date is empty or not correct"}, {status: 400});
      }

      for (let gameNum = 0; gameNum < games.length; gameNum++) {
        const game = games[gameNum];

        if ( !game.blue ) {
          return NextResponse.json( { message: `the blue side of game ${gameNum+1} is empty `}, {status: 400});
        }

        if ( !game.red ) {
          return NextResponse.json( { message: `the red side of game ${gameNum+1} is empty `}, {status: 400});
        }

        if ( scrim ) {
          game.scrim = true;
        }
        
        if ( game.file ) {
            game.info = game.file;
            game.file = undefined;
        }

        if ( game.POV ) {
          const newPOV = {};
          for (let index = 0; index < game.POV.length; index++) {
            const pov = game.POV[index];
            if ( !pov.champ || !pov.url ) {
              return NextResponse.json( { message: `POV with index ${index} have null values `}, {status: 400});
            }
            newPOV[pov.champ] = pov.url;
          }
        }

      }

      let especialMatchesCollection = await getCollection("especialMatches");
      const response = await especialMatchesCollection.insertOne( { name, date, games } );

      return NextResponse.json( { result: true }, {status: 200});
    }catch( e ) {
      return NextResponse.json( { result: false, message: e.message }, {status: 400});
    }
}