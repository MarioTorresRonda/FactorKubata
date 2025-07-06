import { getCollection } from '@/util/mongoDB';

export async function GET(request) {
    let teamsCollection = await getCollection("teams");
    const teams = []
    const findResult = await teamsCollection.find({});
    for await (const team of findResult) {
        teams.push(team);
    }
    return new Response( JSON.stringify( teams ), {status: 200});
}