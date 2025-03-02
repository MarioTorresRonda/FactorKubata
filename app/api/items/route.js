import { NextResponse } from "next/server";
import json from "@/data/lolData/item.json"

export async function GET(request) {

  let imports = "";
  let individuals = "";
  let addedItems = []

  let finalObj = "export const items = {";
  let finalIds = "export const itemsIDS = {";
  Object.keys( json.data ).forEach( ( item ) => {

    const itemObj = json.data[item];
    let itemName = itemObj.name.replaceAll( " ", "_" );
    itemName = itemName.replaceAll( /[^A-z_]/g, "" );

    imports += `import Image${item} from "@/data/lolData/img/item/${item}.png";\n`
    finalIds += `${item} : { image: Image${item} }, \n`

    if ( addedItems.indexOf(itemName) == -1 && !itemObj.name.startsWith("<") ) {    
      individuals += `export const ${itemName} = { image: Image${item} }; \n`
      finalObj += `${itemName} : ${itemName}, \n`
      addedItems.push(itemName);
    }
  } );
  finalObj += "}"
  finalIds += "}"
  

  return new Response( imports + "\n" + individuals + "\n" + finalObj + "\n" + finalIds , {status: 200});
}