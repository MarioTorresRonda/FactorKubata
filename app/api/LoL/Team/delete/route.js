import { getCollection } from '@/util/mongoDB';
import { BSON } from 'mongodb';
import { NextResponse } from "next/server";

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const teamName = decodeURIComponent( searchParams.get('teamName') );
    const response = {}

    try{
      
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