import { NextResponse } from "next/server";
import { getVersion } from "../version/route";

export async function GET(request) {

  
  try{
    let version = await getVersion();
    let [ championsNameListTrimmed, championsKeyListTrimmed ] = await getChampions( version );

    return NextResponse.json( { championsNameListTrimmed, championsKeyListTrimmed }, {status: 200});
  } catch(e) {
    console.log( e );
    return NextResponse.json( { message: e.message }, {status: 400});
  }
}

export async function getChampions( version ) {
  
  let data = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
  console.log( `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json` )
  let json = await data.json();
  let championsNameList = json.data;
  let championsNameListTrimmed = {};
  let championsKeyListTrimmed = {};
  Object.keys(championsNameList).map( name => { 
    const champ = championsNameList[name];
    championsNameListTrimmed[name] = { key : champ.key, name, imgPath : `http://ddragon.leagueoflegends.com/cdn/15.15.1/img/champion/${name}.png` };
    championsKeyListTrimmed[champ.key] = championsNameListTrimmed[name];
  } );

  return [ championsNameListTrimmed, championsKeyListTrimmed ];  
}