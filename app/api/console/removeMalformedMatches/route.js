import { getCollection } from '@/util/mongoDB';

export async function GET(request) {
    
    const matchesCollection = await getCollection("matches");  
    
    const firstDelete = await matchesCollection.deleteMany( { info: null } );
    const secondDelete = await matchesCollection.deleteMany( { status : { $ne : null } } );

    return new Response( JSON.stringify( { firstDelete, secondDelete } ), {status: 200});
}