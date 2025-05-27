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

export default function TeamPlayer({ player, background, scrims }) {

	const leftMainClass = "self-start";
	const leftImageClass = "flex flex-row-reverse justify-start mr-4 gap-4";
	const leftTitleClass = "flex flex-row-reverse justify-start ";
	const leftInsideImageClass = "group-hover:-translate-x-3 ";

	const rightMainClass = "odd:self-end";
	const rightImageClass = "group-odd:flex-row group-odd:ml-4 group-odd:mr-0";
	const rightTitleClass = "group-odd:flex-row ";
	const rightInsideImageClass = "group-odd:group-hover:translate-x-3 ";

	const animateAll = "duration-300 transition-all";

	const statsObject = !scrims ? stats[player.name] : statsScrims[player.name];
	const gameText = statsObject.playedTotalGames > 1 ? <Message code={["home", "team", "players", "games"]} /> : <Message code={["home", "team", "players", "game"]} />
				

	return (
		<div className={`h-[500px] w-4/5 group ${leftMainClass} ${rightMainClass} text-white`}>
			<div className={`relative h-[400px] overflow-hidden mr-4 ${leftImageClass} ${rightImageClass}`}>
				<div className={`absolute w-full -z-10 h-full  ${leftInsideImageClass} ${rightInsideImageClass} ${animateAll}`}>
					<Image src={background} fill={true} alt="background" />
				</div>
				<div
					className={`absolute w-full bg-black/50 -z-10 h-full ${leftInsideImageClass} ${rightInsideImageClass} ${animateAll}`}
				></div>
				<div className="h-full mx-2">
					<Image height={400} src={player.imgSrc} alt={"player" + player.name}></Image>
				</div>
				<div className="flex flex-row justify-evenly flex-1 overflow-hidden" >
					<PlayerPanels stats={ statsObject }/>
					<PlayerChamps playedChamps={statsObject.playedChamps} />
				</div>
			</div>
			<div
				className={`relative bg-stone-300 text-black h-[100px] items-center px-10 gap-4  ${font.className} ${leftTitleClass} ${rightTitleClass} `}
			>
				<p className="text-4xl font-bold">{player.name}</p>
				<div className="p-2 bg-stone-900">
					<Image src={player.role.icon} alt={player.name}></Image>
				</div>
				<p className="text-4xl font-bold">{ statsObject.playedTotalGames } { gameText }</p>
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
				<div className={`absolute -z-10 group-odd:group-hover:-translate-x-5 group-hover:translate-x-5 h-[100px] left-0 right-0 bg-stone-300 text-black ${animateAll}`}>
				</div>
			</div>
		</div>
	);
}