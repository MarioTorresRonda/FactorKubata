import { ERROR, log } from '@/util/logs';
import { createCollection, getCollection } from '@/util/mongoDB';
import { keys, readSecrets } from '@/util/Secrets';
import { Mastery, Ranked } from '@/util/trimmedObjs';
import { BSON } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {

  const api = readSecrets( keys.lol );

  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('gameName');
  const tag = searchParams.get('tagLine');
  const debug = searchParams.get('debug');

  const playersCollection = await getCollection("players");  
  const fieldUpdated = []
  
  let puuid, id;
  const isCached = await playersCollection.findOne( { gameName: name, tagLine : tag } );
  if ( isCached ) {
    puuid = isCached.puuid;
    id = isCached._id;
  }else{
    let data = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${api}`)
    let json = await data.json();
    
    if ( json.status ) {
      return NextResponse.json( { message : "Player do not exist" }, {status: 404});
    }
    
    json.lastUpdate = new Date();
    id = (await playersCollection.insertOne( json )).insertedId;
    puuid = json.puuid;
    fieldUpdated.push("Base")
  }
  
  let player = await playersCollection.findOne( { _id : new BSON.ObjectId(id) } );

  let rankedSoloQ = player.soloQ;
  let rankedFlexQ = player.flexQ;
  //If had passes 8 hours from the last refresh
  if ( !rankedSoloQ || !rankedFlexQ || player.lastRankedUpdate.getTime() + 28800000 < new Date().getTime() ) {
    let data = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${api}`)
    let json = await data.json();

    if ( json.status ) {
      log( ERROR, "An error have appear while obtaining rankeds " + json.status )
      return NextResponse.json( { message : "Something went wrong loading rankeds" }, {status: 404});
    }
    
    player.lastRankedUpdate = new Date();
    const soloQ = json.find( (league) => { return league.queueType == "RANKED_SOLO_5x5" } );
    if ( soloQ ) {
      player.soloQ = new Ranked( soloQ );
      rankedSoloQ = player.soloQ;
    }

    const flexQ = json.find( (league) => { return league.queueType == "RANKED_FLEX_SR" } );
    if ( flexQ ) {
      player.flexQ = new Ranked( flexQ );
      rankedFlexQ = player.flexQ;
    }

    await playersCollection.updateOne( 
        { _id : new BSON.ObjectId(id) },
        { $set: player }
    )
    fieldUpdated.push("Ranked")
  }

  let masteries = player.masteries;
  if ( !masteries || !player.lastMasteriesUpdate || ( player.lastMasteriesUpdate.getTime() - 28800000 ) < new Date().getTime() ) {
    let data = await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${api}`)
    let json = await data.json();

    if ( json.status ) {
      log( ERROR, "An error have appear while obtaining masteries " + json.status )
      return NextResponse.json( { message : "Something went wrong loading masteries" }, {status: 404});
    }

    json = json.filter( mastery => mastery.championPoints > 10000 );
    json = json.map( mastery => new Mastery( mastery ) )

    player.lastMasteriesUpdate = new Date();
    player.masteries = json;
    masteries = json;

    await playersCollection.updateOne( 
        { _id : new BSON.ObjectId(id) },
        { $set: {
          masteries : masteries
        } }
    )
    fieldUpdated.push("Masteries")
  }

  let matches = player.matches;
  if ( !matches || !player.lastMatchesUpdate || ( player.lastMatchesUpdate.getTime() - 28800000 ) < new Date() ) {
    let data = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=100&type=ranked&api_key=${api}`)
    let json = await data.json();

    if ( json.status ) {
      log( ERROR, "An error have appear while obtaining matches " + json.status )
      return NextResponse.json( { message : "Something went wrong loading matches" }, {status: 404});
    }

    if ( !matches ) {
      player.matches = json;
      matches = json;
      player.lastMatchesUpdate = new Date();
    }else{
      const matchSet = new Set();
      matches.forEach( (match) => {
        matchSet.add( match );
      } );
      json.forEach( (match) => {
        matchSet.add( match );
      } );
      matches = Array.from( matchSet );
    }

    await playersCollection.updateOne( 
        { _id : new BSON.ObjectId(id) },
        { $set: {
          matches : matches,
          lastMatchesUpdate: new Date()
        } }
    )
    fieldUpdated.push("Matches")
  }

  const response = { player };
  if ( debug ) {
    response.fieldUpdated = fieldUpdated;
  }

  return NextResponse.json( response, {status: 200});

}