'use client';

import FAI from "../../fragments/FAI";
import { faFlag as scoreIcon } from "@fortawesome/free-regular-svg-icons"
import { useMessageText } from "@/hooks/useMessageText";
import KDA from "./KDA";
import { useState } from "react";

import { faCoins as goldIcon } from "@fortawesome/free-solid-svg-icons"
import { faSeedling as csIcon } from "@fortawesome/free-solid-svg-icons"
import { faBolt as damageIcon } from "@fortawesome/free-solid-svg-icons"

import PlayerView from "./PlayerView";

export default function TeamView( { team, side } ) {

    const [infoShownIndex, setInfoShownIndex] = useState(0)
    const infoArray = [ { name: "GOLD_EARNED", icon: goldIcon }, { name : [ "MINIONS_KILLED", "NEUTRAL_MINIONS_KILLED" ], icon: csIcon }, { name: "TOTAL_DAMAGE_DEALT_TO_CHAMPIONS", icon: damageIcon } ]
    const getText = useMessageText();

    //Side1
    let mainClass = "sm:text-left justify-start";
    let headerClass = "flex-row";
    let tableClass = "sm:flex-row"
    let tableChildClass = "sm:flex-row"
    let textClass = "justify-start";
    let itemsClass = "sm:flex-row";
    
    if ( side == getText([ "home", "matches", "side1" ]) ) {
        mainClass = "sm:text-right sm:items-end";
        headerClass = "flex-row sm:flex-row-reverse sm:pl-0 sm:pr-4";
        tableClass = "sm:flex-row-reverse sm:pl-0 sm:pr-4"
        tableChildClass = "sm:flex-row-reverse"
        textClass = "sm:justify-end";
        itemsClass= "sm:flex-row-reverse";
    }

    function onHandleChangeInfoUp() {
        setInfoShownIndex( prevInfoShownIndex => {
            if ( prevInfoShownIndex == infoArray.length-1 ) {
                return 0;
            }
            return prevInfoShownIndex + 1
        } )
    }

    function onHandleChangeInfoDown() {
        setInfoShownIndex( prevInfoShownIndex => {
            if ( prevInfoShownIndex == 0 ) {
                return infoArray.length - 1;
            }
            return prevInfoShownIndex -1
        } )
    }

    let teamKills = team.players.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    let teamDeaths = team.players.map( player => player.NUM_DEATHS ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    let teamAssists = team.players.map( player => player.ASSISTS ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    let infoShown = infoArray[ infoShownIndex ];

    return (
    <div className={"flex flex-col flex-1 " + mainClass}>
        <div className={"flex sm:w-[60%] items-center pl-4 " +headerClass}>
            <p className={"text-xl w-[34%] font-semibold "}> Lado {side} </p>
            <KDA kills={teamKills} deaths={teamDeaths} assists={teamAssists} className={"w-[23%] justify-center "}  />
            <p className={"text-xl w-[20%] font-semibold "}> <FAI className="h-4 w-full" icon={scoreIcon}></FAI> </p>
            <div  className={"text-xl w-[23%] font-semibold flex flex-row justify-center items-center gap-1 "}>
                <button onClick={onHandleChangeInfoDown}> {"<"} </button>
                <p> <FAI className="h-4 w-full" icon={infoShown.icon}></FAI> </p>
                <button onClick={onHandleChangeInfoUp}> {">"} </button>
            </div>
        </div>
        { team.players.map((player) => {
            return <PlayerView 
            key={player.PUUID} 
            player={player} 
            team={team} 
            infoShown={infoShown}
            mainClass={tableClass}
            infoClass={tableChildClass}
            itemsClass={itemsClass}
            textClass={textClass} />
        }) }
    </div>
    )

}