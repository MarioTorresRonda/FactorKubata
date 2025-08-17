import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
    
    const matchesCollection = await getCollection("matches");  
    
    const firstDelete = await matchesCollection.deleteMany( { info: null } );
    const secondDelete = await matchesCollection.deleteMany( { status : { $ne : null } } );

    return NextResponse.json( { firstDelete, secondDelete }, {status: 200});
}