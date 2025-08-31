import AddButton from "@/components/matches/Add/AddButton";
import AddMatch from "@/components/matches/Add/AddMatch";
import MatchList from "@/components/matches/MatchList";
import EmptyBlock from "@/components/fragments/EmptyBlock";
import { keys, readSecrets } from "@/util/Secrets";
import { cookies } from "next/headers";

export default async function Matches( params ) {

	let addMatchComponent = EmptyBlock;
	let addMatchBodyComponent = EmptyBlock;

	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value;
    const pass = readSecrets( keys.password );

	if ( pass == token ) {
		addMatchComponent = AddButton
		addMatchBodyComponent = AddMatch
	}

	return <MatchList AddMatchButton={addMatchComponent} AddMatchBody={addMatchBodyComponent}  />
}
