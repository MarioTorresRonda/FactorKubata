import { getCollection } from '@/util/mongoDB';
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
      let matchTeams = await especialMatchesCollection.aggregate( [] );
      
      return NextResponse.json( matchTeams, {status: 200});
    }catch( e ) {
      return NextResponse.json( e, {status: 400});
    }
    
}