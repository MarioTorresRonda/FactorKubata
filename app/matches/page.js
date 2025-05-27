'use client'

import Message from "@/components/fragments/Message";
import Match from "@/components/matches/Match";
import { useFetch } from "@/hooks/useFetch";
import { fetchMatchList } from "@/http";
import {Roboto_Condensed} from "next/font/google";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {


	const {
		isFetching, 
		fetchedData : matchList,
		error,
		setFetchedData : setMatchList
	} = useFetch( fetchMatchList, null, [], [] );

	return (
		<main className="mb-32">
			<div className="flex flex-col w-full justify-center items-center gap-4">
				<p className={`text-[52px] font-bold  ${font.className}`}>
					<Message code={["home", "matches", "title"]} />
				</p>
				{ isFetching && <div> loading... </div> }
				{ !isFetching && <>
					{ matchList.map((match) => {
							return <Match key={match.name} match={match} mainPanel={true} />
					}) }
				</> }
				
			</div>
		</main>
	);
}
