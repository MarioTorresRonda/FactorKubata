import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const scrim = searchParams.get('scrim') == "1";

    try{

      let playersResumeCollection = await getCollection("playersResume");
      const playersResume = await playersResumeCollection.findOne( { scrim: scrim }, { sort: { date: -1 } } );

      return NextResponse.json( playersResume, {status: 200});
    }catch( e ) {
      return NextResponse.json( {message: e.message }, {status: 400});
    }
    
}