"use client";

import { useMessageText } from "@/hooks/useMessageText";
import Message from "../fragments/Message";
import PlayerPanel from "./PlayerPanel";
import {faDroplet as killsIcon} from "@fortawesome/free-solid-svg-icons";
import {faSkull as deathsIcon} from "@fortawesome/free-solid-svg-icons";
import {faHandFist as assistsIcon} from "@fortawesome/free-solid-svg-icons";
import {faCalculator as KDAIcon} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function PlayerPanels({ stats }) {

	
	const [ panelIndex, setPanelIndex ] = useState(0);
	const [ lastPanelIndex, setLastPanelIndex ] = useState(0);
	const [ animation, setAnimation ] = useState("");
		const getText = useMessageText();

	const mainPanelClass = `h-full flex flex-col gap-2 md:w-[45%] hover:scale-95 transition-all fill-mode-forwards ${animation}`


    function changePanel() {
		if ( animation != "" ) {
			return;
		}
		setAnimation( "animate-toBottom" );
		setTimeout( () => {
			setPanelIndex( prevPanelIndex => {
				return prevPanelIndex + 1 >= panels.length ? 0 : prevPanelIndex + 1;
			})
		}, 250);

    }

	useEffect(() => {
		setTimeout(() => {
			if ( animation == "animate-fromTop" ) {
				setAnimation( "" )
			}
		},350);

		if ( lastPanelIndex != panelIndex && animation != "" ) {
			setAnimation( "animate-fromTop" );
			setLastPanelIndex( panelIndex );
		}
	}, [animation, panelIndex, lastPanelIndex])
	
	//Replace values for abbreviate forms ( 1000 = 1K, 1000K = 1M, 1000M = 1B)
	const orders = getText(["commons", "orders"])
	Object.keys( stats ).map( key => {
		let value = stats[key];
		let order = -1;
		while ( value / 1000 > 1 ) {
			value = Math.round( value / 1000 )
			order++;
		}
		if ( order >= 0 ) {
			stats[key] = value + orders[order]
		}
	} )


	const firstTotalPanel = [
		{message: ["home", "team", "players", "kills"], text: stats.kills, icon: killsIcon},
		{message: ["home", "team", "players", "deaths"], text: stats.deaths, icon: deathsIcon},
		{message: ["home", "team", "players", "assists"], text: stats.assists, icon: assistsIcon},
	];
	
	const secondTotalPanel = [
		{message: ["home", "team", "players", "damage"], text: stats.totalDamage, icon: killsIcon},
		{message: ["home", "team", "players", "taken"], text: stats.totalTaken, icon: deathsIcon},
		{message: ["home", "team", "players", "heal"], text: stats.totalHeal, icon: assistsIcon},
	];

	const thirdTotalPanel = [
		{message: ["home", "team", "players", "KDA"], text: stats.KDA, icon: KDAIcon},
	];
	
	const totalPanel = (
		<div className={mainPanelClass + ""} onClick={changePanel}>
			<p className="text-center pt-4"> <Message code={["home", "team", "players", "total"]} /> </p>
			<div className="flex flex-row gap-2 justify-center"> 
				<div className="h-4 w-4 bg-white rounded-lg"></div>
				<div className="h-4 w-4 bg-white/50 rounded-lg"></div>
			</div>
			<div className="flex flex-wrap md:flex-nowrap flex-row gap-4 w-full justify-center">
				<PlayerPanel rows={firstTotalPanel} />
				<PlayerPanel rows={secondTotalPanel} />
				<PlayerPanel rows={thirdTotalPanel} />
			</div> 
		</div>		
	);

	const firstBetterPanel = [
		{message: ["home", "team", "players", "kills"], text: stats.mostKills, icon: killsIcon},
		{message: ["home", "team", "players", "deaths"], text: stats.mostDeaths, icon: deathsIcon},
		{message: ["home", "team", "players", "assists"], text: stats.mostAssists, icon: assistsIcon},
	];
	
	const secondBetterPanel = [
		{message: ["home", "team", "players", "damage"], text: stats.mostDamage, icon: killsIcon},
		{message: ["home", "team", "players", "taken"], text: stats.mostTaken, icon: deathsIcon},
		{message: ["home", "team", "players", "heal"], text: stats.mostHeal, icon: assistsIcon},
	];
	
	const thirdBetterPanel = [
		{message: ["home", "team", "players", "minions"], text: stats.mostFarm, icon: killsIcon},
		{message: ["home", "team", "players", "min"], text: stats.mostFarmMin, icon: deathsIcon},
		{message: ["home", "team", "players", "gold"], text: stats.mostGold, icon: assistsIcon},
	];
	
	const betterPanel = (
		<div className={mainPanelClass} onClick={changePanel}>
			<p className="text-center pt-4">  <Message code={["home", "team", "players", "better"]} />  </p>
			<div className="flex flex-row gap-2 justify-center"> 
				<div className="h-4 w-4 bg-white/50 rounded-lg"></div>
				<div className="h-4 w-4 bg-white rounded-lg"></div>
			</div>
			<div className="flex flex-wrap md:flex-nowrap flex-row gap-4 w-full justify-center">
				<PlayerPanel rows={firstBetterPanel} />
				<PlayerPanel rows={secondBetterPanel} />
				<PlayerPanel rows={thirdBetterPanel} />
			</div>
		</div> 
	);

	const panels = [totalPanel, betterPanel];

    return panels[panelIndex]

}