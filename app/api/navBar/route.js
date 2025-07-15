import { cookies } from "next/headers";
import menus from "@/data/navBar"
import { keys, readSecrets } from "@/util/Secrets";

export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  let newNavBar = {...menus};

  const pass = readSecrets( keys.password );
  if ( token != pass ) {
    newNavBar.scouting = undefined;
  }

  return new Response( JSON.stringify( newNavBar ), {status: 200});
}