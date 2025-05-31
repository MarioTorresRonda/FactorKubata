import { matchList } from "@/data/matchList";
import { cookies } from "next/headers";

export async function GET(request) {

  const cookieStore = await cookies()
  const token = cookieStore.get('token');
  let newMatchList = matchList;

  if ( !token || token.value != "yulMason123" ) {
    newMatchList = matchList.map( ( match ) => { 
        //Not game played, no need to delete povs
        if ( !match.games ) {
          return match; 
        }

        match.games.map( ( game ) => {
          game.pov = [];
        })
        return match;
    } )
  }
  
  return new Response( JSON.stringify( newMatchList ), {status: 200});
}