import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const scrims = searchParams.get('scrims');
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
      if ( items ) {
        filter.push( { $limit: items } )
      }

      let especialMatchesCollection = await getCollection("especialMatches");
      let matches = await especialMatchesCollection.aggregate( filter );
      
      return NextResponse.json( matches, {status: 200});
    }catch( e ) {
      return NextResponse.json( e, {status: 400});
    }
    
}