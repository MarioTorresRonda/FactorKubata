"use client";

import Image from "next/image";

import bg1 from "@/public/backgrounds/1V.jpeg";
import bg2 from "@/public/backgrounds/2V.jpeg";
import bg3 from "@/public/backgrounds/3V.jpeg";
import bg4 from "@/public/backgrounds/4V.jpeg";
const backgroundList = [bg1, bg2, bg3, bg4];

import {Roboto_Condensed} from "next/font/google";
import {matches} from "@/data/matchList";
const font = Roboto_Condensed({subsets: ["latin"]});
import {faDroplet as killsIcon} from "@fortawesome/free-solid-svg-icons";
import {faSkull as deathsIcon} from "@fortawesome/free-solid-svg-icons";
import {faHandFist as assistsIcon} from "@fortawesome/free-solid-svg-icons";
import {faCalculator as KDAIcon} from "@fortawesome/free-solid-svg-icons";
import PlayerPanel from "./PlayerPanel";
import Message from "../fragments/Message";

export default function Player({player}) {
	const leftMainClass = "self-start";
	const leftImageClass = "flex flex-row-reverse justify-start mr-4 gap-4";
	const leftTitleClass = "flex flex-row-reverse justify-start ";
	const leftInsideImageClass = "group-hover:-translate-x-3 ";

	const rightMainClass = "odd:self-end";
	const rightImageClass = "group-odd:flex-row group-odd:ml-4 group-odd:mr-0";
	const rightTitleClass = "group-odd:flex-row ";
	const rightInsideImageClass = "group-odd:group-hover:translate-x-3 ";

	const animateAll = "duration-300 transition-all";

	const statsObject = statsObj({matches, player});

	const firstTotalPanel = [
		{message: ["home", "team", "players", "kills"], text: statsObject.kills, icon: killsIcon},
		{message: ["home", "team", "players", "deaths"], text: statsObject.deaths, icon: deathsIcon},
		{message: ["home", "team", "players", "assists"], text: statsObject.assists, icon: assistsIcon},
		{message: ["home", "team", "players", "KDA"], text: statsObject.KDA, icon: KDAIcon},
	];

    const secondTotalPanel = [
		{message: ["home", "team", "players", "damage"], text: statsObject.totalDamage, icon: killsIcon},
		{message: ["home", "team", "players", "taken"], text: statsObject.totalTaken, icon: deathsIcon},
		{message: ["home", "team", "players", "heal"], text: statsObject.totalHeal, icon: assistsIcon},
	];

	const firstBetterPanel = [
		{message: ["home", "team", "players", "kills"], text: statsObject.mostKills, icon: killsIcon},
		{message: ["home", "team", "players", "deaths"], text: statsObject.mostDeaths, icon: deathsIcon},
		{message: ["home", "team", "players", "assists"], text: statsObject.mostAssists, icon: assistsIcon},
	];

    const secondBetterPanel = [
		{message: ["home", "team", "players", "damage"], text: statsObject.mostDamage, icon: killsIcon},
		{message: ["home", "team", "players", "taken"], text: statsObject.mostTaken, icon: deathsIcon},
		{message: ["home", "team", "players", "heal"], text: statsObject.mostHeal, icon: assistsIcon},
	];

	return (
		<div className={`h-[500px] w-4/5 group ${leftMainClass} ${rightMainClass} text-white`}>
			<div className={`relative h-[400px] -z-10 mr-4 ${leftImageClass} ${rightImageClass}`}>
				<div className={`absolute w-full -z-10 h-full ${leftInsideImageClass} ${rightInsideImageClass} ${animateAll}`}>
					<Image src={backgroundList[Math.trunc(Math.random() * backgroundList.length)]} fill={true} alt="background" />
				</div>
				<div
					className={`absolute w-full bg-black/50 -z-10 h-full ${leftInsideImageClass} ${rightInsideImageClass} ${animateAll}`}
				></div>
				<div className="h-full mx-2">
					<Image height={400} src={player.imgSrc} alt={"player" + player.name}></Image>
				</div>
				<div className="flex flex-row justify-evenly flex-1">
					<div className="h-full flex flex-col gap-4">
						<p className="text-center pt-4"> <Message code={["home", "team", "players", "total"]} /> </p>
						<div className="flex flex-row gap-4">
							<PlayerPanel rows={firstTotalPanel} />
							<PlayerPanel rows={secondTotalPanel} />
						</div>
					</div>
                    <div className="h-full flex flex-col gap-4">
						<p className="text-center pt-4">  <Message code={["home", "team", "players", "better"]} />  </p>
						<div className="flex flex-row gap-4">
							<PlayerPanel rows={firstBetterPanel} />
							<PlayerPanel rows={secondBetterPanel} />
						</div>
					</div>
				</div>
			</div>
			<div
				className={`bg-stone-300 text-black h-[100px] group-hover:scale-x-105 items-center px-10 ${animateAll} ${font.className} ${leftTitleClass} ${rightTitleClass} `}
			>
				<p className="text-4xl font-bold">{player.name}</p>
			</div>
		</div>
	);
}

function statsObj({matches, player}) {
	const playedGames = matches
		.map((match) => {
			var game;
			if (match.info) {
				match.info.participants.forEach((participant) => {
					if (participant.PUUID == player.player.puuid) {
						game = participant;
					}
				});
				return game;
			}
		})
		.filter((notUndefined) => notUndefined !== undefined);

    //Totals
    const kills = sumOf( playedGames, "CHAMPIONS_KILLED" );
	const deaths = sumOf( playedGames, "NUM_DEATHS" );
	const assists = sumOf( playedGames, "ASSISTS" );
    const KDA = Math.round( ( kills + assists ) / ( deaths / 100 ) ) / 100;
	const totalDamage = sumOf( playedGames, "TOTAL_DAMAGE_DEALT_TO_CHAMPIONS" );
	const totalTaken = sumOf( playedGames, "TOTAL_DAMAGE_TAKEN" );
	const totalHeal = sumOf( playedGames, "TOTAL_HEAL" );

    //Betters

	let mostKills = 0;
	let mostDeaths = 9999;
	let mostAssists = 0;
    let mostDamage = 0;
	let mostTaken = 0;
	let mostHeal = 0;
	playedGames.forEach((player) => {
		mostKills = mostKills < Number(player.CHAMPIONS_KILLED) ? Number(player.CHAMPIONS_KILLED) : mostKills;
		mostDeaths = mostDeaths > Number(player.NUM_DEATHS) ? Number(player.NUM_DEATHS) : mostDeaths;
		mostAssists = mostAssists < Number(player.ASSISTS) ? Number(player.ASSISTS) : mostAssists;
		mostDamage = mostDamage < Number(player.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS) ? Number(player.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS) : mostDamage;
		mostTaken = mostTaken < Number(player.TOTAL_DAMAGE_TAKEN) ? Number(player.TOTAL_DAMAGE_TAKEN) : mostTaken;
		mostHeal = mostHeal < Number(player.TOTAL_HEAL) ? Number(player.TOTAL_HEAL) : mostHeal;
	});


	return {
		kills,
		deaths,
		assists,
		KDA,
        totalDamage,
        totalTaken,
        totalHeal,
		mostKills,
		mostDeaths,
		mostAssists,
        mostDamage,
        mostTaken,
        mostHeal,
	};
}

function sumOf( array, prop ) {
    return array
    .map((elem) => elem[prop] )
    .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);

}
