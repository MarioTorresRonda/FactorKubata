import { matchList } from "@/data/matchList";
import { cookies } from "next/headers";

export async function GET(request) {

  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  let newMatchList = matchList;

  if ( token.value != "yulMason123" ) {
    newMatchList = matchList.map( ( match ) => { 
        return { 
            date : match.date, 
            name : match.name, 
            win : match.win, 
            info : match.info, 
            blue : match.blue, 
            red : match.red
        } 
    } )
  }
  
  return new Response( JSON.stringify( newMatchList ), {status: 200});
}