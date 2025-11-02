import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const scrims = searchParams.get('scrims') == "1";
    const items = searchParams.get('items');
    const pass = readSecrets( keys.password );

    try{

      const filter = []
      if ( pass != token ) {
        filter.push( { $set: { "games.POV" : [] } } )
      }
      if ( !scrims ) {
        filter.push( { $match: { "games.scrim" :  { $ne : true } }  } )
      }
      if ( items && items != -1 ) {
        filter.push( { $limit: Number(items) } )
      }
      filter.push( { $project: { _id: 0 } } )
      filter.push( { $sort: { date: -1 } } )

      let especialMatchesCollection = await getCollection("especialMatches");
      let matchesSearch = await especialMatchesCollection.aggregate( filter );
      const matches = [];
      for await (const match of matchesSearch) {
        match.games.forEach( game => {
          game.info = JSON.parse( game.info )
          if ( game.POV ) {
            game.info.participants.map( ( participant ) => {
              const pov = game.POV[participant.SKIN];
              if ( pov ) {
                participant.POV = pov;
              }
            } )
          }
        });
        matches.push( match );
      }
      

      return NextResponse.json( matches, {status: 200});
    }catch( e ) {
      return NextResponse.json( { result: false, message: e.message }, {status: 400});
    }
    
}