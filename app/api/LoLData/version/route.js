import { NextResponse } from "next/server";

export async function GET(request) {

  let version = await getVersion();
  return NextResponse.json( version, {status: 200});
}

export async function getVersion() {
  let data = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
  let version = await data.json();
  return version[0];  
}