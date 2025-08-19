import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function GET(request) {

    const pass = readSecrets( keys.password );

    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if ( token != pass ) {
          return NextResponse.json( { message: "User is not logged in"}, {status: 400});
    }

    let teamsCollection = await getCollection("teams");
    const teams = []
    const findResult = await teamsCollection.aggregate( [ { $match: { delete :  { $ne : true } }  } ] );
    for await (const team of findResult) {
        teams.push(team);
    }
    return NextResponse.json( teams , {status: 200});
}