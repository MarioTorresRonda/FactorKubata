import { getCollection } from "@/util/mongoDB";

export async function GET(request) {
    
    const searchParams = request.nextUrl.searchParams;
    const puuid = searchParams.get('puuid');

    const matchesCollection = await getCollection("matches");  
    const playersCollection = await getCollection("players");  
    
    const player = await playersCollection.findOne( { puuid: puuid } );
    if ( !player ) {
        return new Response( "Player does not exist", {status: 400});
    }

    const firstDelete = await matchesCollection.deleteMany( { matchId : { $in : player.matches } } );

    return new Response( JSON.stringify( { firstDelete } ), {status: 200});
}