import { NextResponse } from "next/server";
import { getVersion } from "../version/route";

export async function GET(request) {

  let version = await getVersion();
  
  try{

    let data = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/es_ES/item.json`);
    let json = await data.json();
    let itemsIDList = json.data;
    let championsIDListTrimmed = {};
    Object.keys(itemsIDList).map( itemID => { 
      const item = itemsIDList[itemID];
      championsIDListTrimmed[itemID] = { name : item.name, imgPath : `http://ddragon.leagueoflegends.com/cdn/15.15.1/img/item/${item.image.full}` };
    } );

    return NextResponse.json( championsIDListTrimmed, {status: 200});
  } catch(e) {
    return NextResponse.json( e, {status: 400});
  }
}