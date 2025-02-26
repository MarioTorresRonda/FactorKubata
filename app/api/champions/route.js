import { NextResponse } from "next/server";
import json from "@/data/lolData/champion.json"

export async function GET(request) {

  let imports = "";
  let individuals = "";
  let finalObj = "export const champions = {";
  Object.keys( json.data ).forEach( ( champion ) => {

    imports += `import ${champion}Image from "@/data/lolData/img/champion/${champion}.png";\n`
    individuals += `export const ${champion} = { image: ${champion}Image }; \n`
    finalObj += `${champion} : ${champion}, \n`
  } );
  finalObj += "}"
  

  return new Response(imports + "\n" + individuals + "\n" + finalObj, {status: 200});
}