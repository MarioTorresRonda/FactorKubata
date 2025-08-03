import { getCollection } from '@/util/mongoDB';
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function GET(request) {
    let teamsCollection = await getCollection("teams");
    const teams = []
    const findResult = await teamsCollection.aggregate( [ { $match: { delete :  { $ne : true } }  } ] );
    for await (const team of findResult) {
        teams.push(team);
    }
    return NextResponse.json( teams , {status: 200});
}