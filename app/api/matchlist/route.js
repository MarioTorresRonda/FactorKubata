import { matchList } from "@/data/matchList";
import { keys, readSecrets } from "@/util/Secrets";
import { NextResponse } from "next/server";

export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;
  let newMatchList = [...matchList];

  const token = searchParams.get('token');
  const pass = readSecrets( keys.password );
  if ( token != pass ) {
    newMatchList = [...newMatchList.map( ( match ) => { 

        const newMatch = {...match};

        //Not game played, no need to delete povs
        if ( !newMatch.games ) {
          return newMatch; 
        }

        newMatch.games = [...newMatch.games.map( ( game ) => {
          const newGame = {...game};
          newGame.POV = {};
          return newGame;
        })]
        return newMatch;
    } ) ];
  }

  const scrims = searchParams.get('scrims');
  if ( !scrims || scrims === "false" ) {
    

    newMatchList = newMatchList.filter( (match) => {
      let isScrim = false;
      match.games.forEach( (game) => {
        if ( game.scrim ) {
          isScrim = true;
          return;
        }
      });
      return !isScrim;
    } );
  }
  
  const items = searchParams.get('items');
  if ( items && Number(items) && Number(items) > 0 ) {
    newMatchList = newMatchList.slice( 0, items );
  }

  return NextResponse.json( newMatchList, {status: 200});
}