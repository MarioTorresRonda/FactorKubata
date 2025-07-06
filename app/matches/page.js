'use client'

import Message from "@/components/fragments/Message";
import SliderCheck from "@/components/fragments/SliderCheck";
import Match from "@/components/matches/Match";
import { useFetch } from "@/hooks/useFetch";
import { fetchMatchList } from "@/http";
import { getCookie } from "@/util/cookies";
import {Roboto_Condensed} from "next/font/google";
import { useEffect, useState } from "react";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {

	const [scrims, setScrims] = useState( false );
	const [matchListBody, setMatchListBody] = useState( { items: -1, scrims : false, token : "" } );

	const {
		isFetching, 
		fetchedData : matchList,
		error,
		setFetchedData : setMatchList
	} = useFetch( fetchMatchList, matchListBody, [], [] );

	useEffect(() => {
		setMatchListBody( prevMatchListBody => {
			prevMatchListBody.token = getCookie("token");
			return {...prevMatchListBody};
		} )	
	}, [])
	

	function onClickScrims() {
		setScrims( !scrims );
		setTimeout(() => {			
			setMatchListBody( prevMatchListBody => { 
				prevMatchListBody.scrims = !scrims;
				return {...prevMatchListBody};
			} );
		}, 300);
	}

	return (
		<main className="mb-32">
			<div className="flex flex-col w-full justify-center items-center gap-4">
				<div className="flex flex-col">
					<p className={`text-[52px] font-bold  ${font.className}`}>
						<Message code={["home", "matches", "title"]} />
					</p>
					<div className="flex flex-row mb-6 justify-center items-center">
						<p className="text-lg"> <Message code={["home", "team", "scrims"]} /> </p>
						<SliderCheck onClick={onClickScrims} value={scrims} className="h-6 w-12" />
					</div>
				</div>
				{ isFetching && <div> loading... </div> }
				{ !isFetching && <div className={`flex flex-col w-full justify-center items-center gap-4 transition-all duration-300  ${  scrims != matchListBody.scrims ? "opacity-0" : "opacity-100" } `}>
					{ matchList.map((match) => {
							return <Match key={match.name} match={match} mainPanel={true} />
					}) }
				</div> }
				
			</div>
		</main>
	);
}
