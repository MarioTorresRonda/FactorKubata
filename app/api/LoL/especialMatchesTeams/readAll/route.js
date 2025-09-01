import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const pass = readSecrets( keys.password );

    try{

      if ( pass != token ) {
          return NextResponse.json( { message: "User don't have enough permissions"}, {status: 400});
      }

      let especialMatchesCollection = await getCollection("especialMatchesTeams");
      const teams = []
      const findResult = await especialMatchesCollection.aggregate( [] );
      for await (const team of findResult) {
          teams.push(team);
      }      
      return NextResponse.json( teams, {status: 200});
    }catch( e ) {
      return NextResponse.json( {message: e.message }, {status: 400});
    }
    
}