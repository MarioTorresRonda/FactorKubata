'use client';

import Image from "next/image";
import FAI from "../../fragments/FAI";
import { faFlag as scoreIcon } from "@fortawesome/free-regular-svg-icons"
import { faEye as povIcon } from "@fortawesome/free-regular-svg-icons"
import { useMessageText } from "@/hooks/useMessageText";
import KDA from "./KDA";
import { useRouter } from 'next/navigation'
import { useState } from "react";

import { faCoins as goldIcon } from "@fortawesome/free-solid-svg-icons"
import { faSeedling as csIcon } from "@fortawesome/free-solid-svg-icons"
import { faBolt as damageIcon } from "@fortawesome/free-solid-svg-icons"
import { champions } from "@/data/formattedChampions";
import { itemsIDS } from "@/data/formattedItems";

export default function TeamView( { team, side } ) {

    const [infoShownIndex, setInfoShownIndex] = useState(0)
    const infoArray = [ { name: "GOLD_EARNED", icon: goldIcon }, { name : [ "MINIONS_KILLED", "NEUTRAL_MINIONS_KILLED" ], icon: csIcon }, { name: "TOTAL_DAMAGE_DEALT_TO_CHAMPIONS", icon: damageIcon } ]
    const getText = useMessageText();
    const router = useRouter()

    //Side1
    let mainClass = "flex flex-col flex-1";
    let header = ["order-1", "order-2", "order-3", "order-4"];
    let headerClass = "flex flex-row w-full pl-4 items-center ";
    let table = ["order-1", "order-2", "order-3", "order-4", "order-5"]
    let playerName = ["order-1", "order-2", "order-3"]
    let tableClass = "flex flex-row h-16 odd:bg-black/10 w-full items-center pl-4"
    
    if ( side == getText([ "home", "matches", "side1" ]) ) {
        mainClass = "flex flex-col flex-1 sm:text-right sm:items-end";
        header = ["sm:order-4", "sm:order-3", "sm:order-2", "sm:order-1"];
        headerClass = "flex flex-row w-full items-center  sm:justify-end pl-4 sm:pl-0 sm:pr-4";
        table = ["sm:order-5", "sm:order-4 sm:justify-end", "sm:order-3", "sm:order-2", "sm:order-1 flex-row-reverse "]
        playerName = ["sm:order-2", "sm:order-1"]
        tableClass = "flex flex-row h-16 odd:bg-black/10 w-full items-center sm:justify-end pl-4 sm:pl-0 sm:pr-4"
    }

    function onHandleSubmit( url ) {
        router.push(url, { scroll: false })
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

    function getPlayerName( player ) {
        const puuid = player.PUUID;
        let playerName;
        
        if ( team.team ) {
            Object.values( team.team.players ).forEach( teamPlayer => {
                if ( teamPlayer.puuid == puuid ) {
                    playerName = teamPlayer.name;
                    return;
                }
            });
        }

        if ( !playerName ) {
            playerName = player.NAME;
            return playerName
        }
        return playerName
    }

    function getInfoShow( player, names ) {
        if ( Array.isArray( names ) ) {
            return names.map( name => player[name] ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
        }else{
            return player[names];
        }
    }

    let teamKills = team.players.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    let teamDeaths = team.players.map( player => player.NUM_DEATHS ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    let teamAssists = team.players.map( player => player.ASSISTS ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    let infoShown = infoArray[ infoShownIndex ];

    return (
    <div className={mainClass}>
        <div className={headerClass}>
            <p className={"text-xl w-[20%] font-semibold " + header[0] }> Lado {side} </p>
            <KDA kills={teamKills} deaths={teamDeaths} assists={teamAssists} className={"w-[14%] justify-center " + header[1]}  />
            <p className={"text-xl w-[12%] font-semibold " + header[2] }> <FAI className="h-4 w-full" icon={scoreIcon}></FAI> </p>
            <div  className={"text-xl w-[14%] font-semibold flex flex-row justify-center items-center gap-1 " + header[3] }>
                <button onClick={onHandleChangeInfoDown}> {"<"} </button>
                <p> <FAI className="h-4 w-full" icon={infoShown.icon}></FAI> </p>
                <button onClick={onHandleChangeInfoUp}> {">"} </button>
            </div>
        </div>
        { team.players.map((player) => {
            
            const items = [ player.ITEM0, player.ITEM1, player.ITEM2, player.ITEM3, player.ITEM4, player.ITEM5, player.ITEM6 ];

            return (
                <div key={player.PUUID} className={tableClass}>
                    <div className={"w-[7%] " + table[0] }> <Image alt={player.SKIN} src={ champions[player.SKIN].image }></Image> </div>
                    <div className={"w-[27%] px-2 flex flex-row items-center gap-2 " + table[1] }> 
                        <p className={playerName[0]} > { getPlayerName( player ) } </p> 
                        { player.POV && <button onClick={() => { onHandleSubmit(player.POV) } } className={playerName[1]}> <FAI  className={"h-4 w-full hover:animate-pulse "} icon={povIcon}></FAI> </button> }
                    </div>
                    <KDA kills={player.CHAMPIONS_KILLED} deaths={player.NUM_DEATHS} assists={player.ASSISTS} className={"w-[12%] justify-center " + table[2] } />
                    <div className={"w-[14%] text-center " + table[3] }> 
                        <p> { getInfoShow( player, infoShown.name ) } </p> 
                    </div>
                    <div className={"w-[35%] bg-stone-900/10 flex "+ table[4] }>
                        { items.map( (item) => {
                            return (
                                <div className="flex-1" key={item}>
                                    { item != 0 && <Image alt={item} src={itemsIDS[item].image}></Image> }
                                </div>
                            )
                        } ) }
                    </div>
                </div>
            );
        }) }
    </div>
    )

}