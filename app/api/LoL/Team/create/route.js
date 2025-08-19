import { getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { NextResponse } from 'next/server';

export async function GET(request) {
  
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const pass = readSecrets( keys.password );
    const teamName = decodeURIComponent( searchParams.get('teamName') );
    const playerSearch = decodeURIComponent( searchParams.get('playerSearch') );

    try{

        if ( token != pass ) {
            return NextResponse.json( { message: "User is not logged in"}, {status: 400});
        }

        if ( await checkNameExist(teamName) ) {
            return NextResponse.json( { message: "Team already exist"}, {status: 400});
        }

        const playersJSON = playerSearch;
        if ( !playersJSON || playersJSON.length == 0 || playersJSON == "null" || playersJSON == "undefined" ) {
            return NextResponse.json( { message: "Players is not correctly created"}, {status: 400});
        }
        const playersObj = JSON.parse( playersJSON );

        // console.log( "before players", playersObj)
        // if ( await checkPlayersAlreadyOnTeam( playersObj ) ) {
        //     return NextResponse.json( { message: "Team with same players already exist"}, {status: 400});
        // }

        let teamsCollection = await getCollection("teams");

        const team = {};
        team.players = playersObj;
        team.teamName = teamName;
        await teamsCollection.insertOne( team );

      return NextResponse.json( team, {status: 200});
    }catch( e ) {
      return NextResponse.json( { message: e.message }, {status: 400});
    }
}

async function checkNameExist(teamName) {
    let teamsCollection = await getCollection("teams");
    let team = await teamsCollection.findOne( { teamName : teamName } );
    return team != null;
}
// async function checkPlayersAlreadyOnTeam( playersObj ) {
//     let teamsCollection = await getCollection("teams");
//     const query = { $match : { players: { $all : [] } } };
//     Object.keys( playersObj ).forEach( playerKey => {
        
//         query.$match.players.$all.push( { player } )
//     });
//     const team = await teamsCollection.aggregate( query );
//     return team != null;
// }