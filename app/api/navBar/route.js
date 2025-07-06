import { cookies } from "next/headers";
import menus from "@/data/navBar"
import { password, readSecrets } from "@/util/Secrets";

export async function GET(request) {

  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  let newNavBar = {...menus};

  const pass = readSecrets( password );
  if ( token != pass ) {
    newNavBar.scouting = undefined;
  }

  return new Response( JSON.stringify( newNavBar ), {status: 200});
}