import { NextResponse } from "next/server";
import { createPlayerResume } from "./_create";

const fs = require('fs');

export async function GET(request) {
	await createPlayerResume();
	return NextResponse.json( { message: `OK. filed updated` }, {status: 200});
}