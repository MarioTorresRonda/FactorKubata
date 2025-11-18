import { getCollection } from "@/util/mongoDB";
import { trimMatch, trimObj } from "@/util/trimObjects";
import { NextResponse } from "next/server";

export async function GET(request) {
    
    const matchesCollection = await getCollection("matches");   
    let findMatches = await matchesCollection.aggregate( [ { $match: { trimVersion : { $ne: trimMatch.structure } } } ] );

    for await (const match of findMatches) {
        const matchTrimmed = trimObj( match, trimMatch.structure, {} );
        console.log( matchTrimmed );
        matchTrimmed.trimVersion = trimMatch.trimStructureVersion;
        await matchesCollection.deleteOne( { matchId : matchTrimmed.matchId } );
        await matchesCollection.insertOne( matchTrimmed );
    }

    if ( !player ) {
        return NextResponse.json( { message : "Player does not exist" }, {status: 400});
    }


    return NextResponse.json( { firstDelete }, {status: 200});
}