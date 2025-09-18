import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { BSON } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json( "This method have to be accessed by POST", {status: 405});
}

export async function POST(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    const body = await request.json();
    const pass = readSecrets( keys.password );

    let response = {};

    try{
        
      if ( pass != token ) {
          return NextResponse.json( { message: "User don't have enough permissions"}, {status: 400});
      }

      let especialMatchesTeamsCollection = await getCollection("especialMatchesTeams");
      let team = await especialMatchesTeamsCollection.findOne( { name : body.name } );
      if ( !team ) {
        return NextResponse.json( { message: "Team does not exist"}, {status: 400});
      }

      response.id = team._id;
      response.updated = await especialMatchesTeamsCollection.deleteOne( { _id : new BSON.ObjectId(team._id) } )
      response.result = true;
        
      return NextResponse.json( response, {status: 200});
    }catch( e ) {
      return NextResponse.json( {message: e.message }, {status: 400});
    }
}