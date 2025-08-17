import { getCollection } from "@/util/mongoDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    
    const searchParams = request.nextUrl.searchParams;
    const puuid = searchParams.get('puuid');

    const matchesCollection = await getCollection("matches");  
    const playersCollection = await getCollection("players");  
    
    const player = await playersCollection.findOne( { puuid: puuid } );
    if ( !player ) {
        return NextResponse.json( { message : "Player does not exist" }, {status: 400});
    }

    const firstDelete = await matchesCollection.deleteMany( { matchId : { $in : player.matches } } );

    return NextResponse.json( { firstDelete }, {status: 200});
}