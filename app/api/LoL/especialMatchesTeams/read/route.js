import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const teamName = searchParams.get('teamName');

    try{

      let especialMatchesCollection = await getCollection("especialMatchesTeams");
      const team = await especialMatchesCollection.findOne( { name : teamName } );

      return NextResponse.json( team, {status: 200});
    }catch( e ) {
      return NextResponse.json( {message: e.message }, {status: 400});
    }
    
}