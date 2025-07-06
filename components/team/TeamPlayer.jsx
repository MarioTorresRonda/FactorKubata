import Image from "next/image";

import {Roboto_Condensed} from "next/font/google";
const font = Roboto_Condensed({subsets: ["latin"]});
import PlayerPanels from "./PlayerPanels";
import PlayerChamps from "./PlayerChamps";
import Message from "../fragments/Message";
import { stats } from "@/data/playerStats";
import { stats as statsScrims } from "@/data/playerStatsScrims";
import FAI from "../fragments/FAI";
import { badges } from "@/data/badges";
import Tooltip from "../fragments/Tooltip";

const smallClass = {
	image : "flex-col-reverse",
	title : "flex-row flex-wrap py-4 justify-center"
}

const leftC = {
	main : "lg:self-start",
	image :  "lg:flex-row-reverse lg:justify-start lg:mr-4 lg:gap-4" ,
	title : "lg:flex-row-reverse lg:justify-start lg:h-[100px]",
	insideImage : "lg:group-hover:-translate-x-3"
}

const rightC = {
	main : "lg:self-end",
	image : "lg:flex-row lg:justify-end lg:ml-4 lg:mr-0",
	title : "lg:flex-row lg:h-[100px]",
	insideImage : "lg:group-hover:translate-x-3"
}

export default function TeamPlayer({ player, background, scrims, odd }) {


	const animateAll = "duration-300 transition-all";

	const statsObject = !scrims ? stats[player.name] : statsScrims[player.name];
	const gameText = statsObject.playedTotalGames > 1 ? <Message code={["home", "team", "players", "games"]} /> : <Message code={["home", "team", "players", "game"]} />


	return (
		<div className={`
			lg:h-[500px] w-full xl:w-4/5 text-white group 
			${ odd ? rightC.main : leftC.main }
		`}>
			<div className={`
				relative lg:h-[400px] flex overflow-hidden  
				${smallClass.image}
				${odd ? rightC.image : leftC.image }
				
			`}>
				<div className={`
					absolute w-full -z-10 h-full
					${ odd ? rightC.insideImage : leftC.insideImage }
					${animateAll}
				`}>
					<Image src={background} fill={true} alt="background" />
				</div>
				<div
					className={`
						absolute w-full bg-black/50 -z-10 h-full 
						${odd ? rightC.insideImage : leftC.insideImage }
						${animateAll}
					`}
				></div>
				<div className="h-full mx-2 flex flex-row justify-center">
					<Image height={400} src={player.imgSrc} alt={"player" + player.name}></Image>
				</div>
				<div className="flex flex-col gap-4 md:flex-row justify-evenly flex-1 overflow-hidden py-4 lg:py-0" >
					<PlayerPanels stats={ statsObject }/>
					<PlayerChamps playedChamps={statsObject.playedChamps} />
				</div>
			</div>
			<div
				className={`
					relative bg-stone-300 text-black items-center px-10 gap-4 text-center ${font.className} flex 
					${smallClass.title }
					${odd ? rightC.title : leftC.title }
				`}
			>
				<p className="text-4xl font-bold">{player.name}</p>
				<div className="p-2 bg-stone-900">
					<Image src={player.role.icon} alt={player.name}></Image>
				</div>
				<p className="text-4xl font-bold">{ statsObject.playedTotalGames } { gameText }</p>
				<div className="flex flex-row gap-2 lg:gap-4">
					{ statsObject.badges.map( ( badge) => {

						const tooltipElement = <div className="flex flex-col">
							<p className="font-semibold text-xl"> <Message code={["home", "team", "badges", badge, "title"]}/> </p>
							<p> <Message code={["home", "team", "badges", badge, "desc"]}/> </p>
						</div>

						return (
							<div key={badge} className="relative h-12 w-12 transition-all duration-300">
								<div className={`mt-[3px] ml-[3px] scale-105 absolute h-12 w-12 bg-stone-900/90 rounded-full flex justify-center items-center`}> 
								</div>
								<div className={`h-12 w-12 absolute ${badges[badge].color} text-white/40 rounded-full flex justify-center items-center`}> 
									<Tooltip className="text-base p-4" text={tooltipElement}>
										<FAI className="h-6" icon={ badges[badge].icon }></FAI> 
									</Tooltip>
								</div>
							</div>
						)
					}) }
				</div>
				<div className={`absolute -z-10 group-odd:group-hover:-translate-x-5 group-hover:translate-x-5 lg:h-[100px] left-0 right-0 bg-stone-300 text-black ${animateAll}`}>
				</div>
			</div>
		</div>
	);
}