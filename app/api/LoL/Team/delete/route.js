import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { BSON } from 'mongodb';
import { NextResponse } from "next/server";

export async function GET(request) {
  

    const pass = readSecrets( keys.password );

    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const teamName = decodeURIComponent( searchParams.get('teamName') );
    const response = {}

    try{

        if ( token != pass ) {
            return NextResponse.json( { message: "User is not logged in"}, {status: 400});
        }
      
      let teamsCollection = await getCollection("teams");
      let team = await teamsCollection.findOne( { teamName : teamName } );
      if ( !team || team.delete ) {
        return NextResponse.json( { message: "Team does not exist"}, {status: 400});
      }
      
      response.id = team._id;
      response.updated = await teamsCollection.updateOne( { _id : new BSON.ObjectId(team._id) }, {
        $set: { delete : true }
      } )

      

      return NextResponse.json( response, {status: 200});
    }catch( e ) {
      return NextResponse.json( e, {status: 400});
    }
}