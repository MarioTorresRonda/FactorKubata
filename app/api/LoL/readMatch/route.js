import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { MatchPlayer } from '@/util/trimmedObjs';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get('matchId');

    const matchesCollection = await getCollection("matches");  
    let match = await matchesCollection.findOne( { matchId : matchId } );

    if ( !match ) {
      
      const api = readSecrets( keys.lol );
      let data = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api}`)
      let json = await data.json();

      if ( json.httpStatus ) {
        if (  json.httpStatus == 429 ) {
          return new Response( json.message, {status: 429});
        }
        return new Response( json.message, { status : json.httpStatus });
      }

      json.info.participants = json.info.participants.map( participant =>  new MatchPlayer( participant ) );

      match = json;
      match.matchId = matchId;
      
      await matchesCollection.insertOne( json );
    }

    return new Response( JSON.stringify( match ), {status: 200});
}