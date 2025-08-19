import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const pass = readSecrets( keys.password );

    const searchParams = request.nextUrl.searchParams;
    const teamName = decodeURIComponent( searchParams.get('teamName') );
    const token = searchParams.get('token');

    try{      
      if ( token != pass ) {
          return NextResponse.json( { message: "User is not logged in"}, {status: 400});
      }

      let teamsCollection = await getCollection("teams");
      let team = await teamsCollection.findOne( { teamName : teamName } );
      if ( !team ) {
        return NextResponse.json( { message: "Team do not exist"}, {status: 400});
      }
      
      return NextResponse.json( team, {status: 200});
    }catch( e ) {
      return NextResponse.json( e, {status: 400});
    }
}