import { NextResponse } from "next/server";
import json from "@/data/lolData/champion.json"

export async function GET(request) {

  let imports = "";
  let individuals = "";
  let finalObj = "export const championsKeys = {";
  Object.keys( json.data ).forEach( ( champion ) => {
    const key = json.data[champion].key;
    imports += `import ${champion}Image from "@/data/lolData/img/champion/${champion}.png";\n`
    individuals += `const ${champion} = { image: ${champion}Image }; \n`
    finalObj += `${key} : ${champion}, \n`
  } );
  finalObj += "}"
  

  return new Response(imports + "\n" + individuals + "\n" + finalObj, {status: 200});
}