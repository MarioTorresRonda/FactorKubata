'use client'

import Message from "@/components/fragments/Message";
import SliderCheck from "@/components/fragments/SliderCheck";
import TeamPlayer from "@/components/team/TeamPlayer";
import { players } from "@/data/players";
import {Roboto_Condensed} from "next/font/google";
import {  useState } from "react";

const backgroundList = [bg1, bg2, bg3, bg4];

import bg1 from "@/public/backgrounds/1V.jpeg";
import bg2 from "@/public/backgrounds/2V.jpeg";
import bg3 from "@/public/backgrounds/3V.jpeg";
import bg4 from "@/public/backgrounds/4V.jpeg";
import { fetchPlayersResume } from "@/data/fetch/playersResume";
import { useFetch } from "@/hooks/useFetch";
import { isEmpty } from "@/util/Objects";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {


    const [ playersResumeBody, setPlayersResumeBody] = useState( { scrims : false } );
	const [ backgrounds, setBackgrounds ] = useState( players.map( () => backgroundList[ Math.trunc(Math.random() * backgroundList.length) ] ) );
	
	const {
		isFetching, 
		fetchedData : stats,
		error,
		setFetchedData : setStats
	} = useFetch( fetchPlayersResume, playersResumeBody, {}, [] );

	function onClickScrims() {
		setPlayersResumeBody( oldResume => {
			const newResume = { ... oldResume };
			newResume.scrims = !oldResume.scrims;
			return newResume;
		} );
	}


	return (
		<main className="mb-32 text-5xl w-full h-full flex flex-col items-center justify-center mt-8">
			<div className="flex flex-row mb-6 justify-center items-center">
				<p className="text-lg"> <Message code={["home", "team", "scrims"]} /> </p>
				<SliderCheck onClick={onClickScrims} value={playersResumeBody.scrims} className="h-6 w-12" />
			</div>
			{ isFetching && <div> loading... </div> }
			{ ( !isFetching && error ) && <div className="bg-red-800 text-white "> {error.message} </div> }
			{ ( !isFetching && !isEmpty( stats ) ) && <div className="flex flex-col gap-6 w-full"> { players.map( (player, index) => {
				return <TeamPlayer key={player.name} stats={stats.resume} player={player} background={backgrounds[index]} odd={index % 2 == 0} />
			}) } </div> }
		</main>
	);
}
