'use client'

import Image from "next/image";
import Message from "@/components/fragments/Message";
import HorizontalBar from "@/components/fragments/horizontalBar";
import {teams} from "@/data/teams";
import FAI from "@/components/fragments/FAI";

import { faEyeSlash as showIcon } from "@fortawesome/free-solid-svg-icons"
import { parseMatchDate } from "@/util/dates";
import { useState } from "react";
import ExpandedView from "./ExpandedView";

export default function Match({match}) {
    const [shown, setShown] = useState(false);

    const bluePlayers = [];
    const redPlayers = [];
    let result = "";

    let timeLeft = null;
    if ( match.win == null ) {
        timeLeft = Math.trunc( new Date( match.date - new Date() ) / 1000 / 60 / 60 ) ;
        if ( timeLeft < 24 ) {
            timeLeft += " Horas"
        }else{
            timeLeft /= 24;
            timeLeft += " Dias";
        }
    }
    
    let backgroundColor = "bg-stone-200";
    if ( shown && match.win != null ) {
        if ( match.win ) {
            backgroundColor = "bg-green-300"
        }else{
            backgroundColor = "bg-red-300"
        }

        match.info.participants.forEach(element => {
            if ( element.TEAM == "100" ) {
                bluePlayers.push( element );
            }
            if ( element.TEAM == "200" ) {
                redPlayers.push( element );
            }
        });
        
        result += bluePlayers.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
        result += "-";
        result += redPlayers.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    }

    const blueSide = { team: match.blue, players: bluePlayers };
    const redSide ={ team: match.red, players: redPlayers };

    function onHandleShown() {
        setShown( prevShown => !prevShown );
    }

    return (
        <div className={` ${backgroundColor}  lg:w-2/3 shadow-md shadow-gray-800 dark:shadow-black text-stone-900 hover:rotate-y-6 transition-all duration-300`}>
            <div className="h-12 px-4 flex flex-row justify-center items-center text-xl">
                <div>
                    <Message code={["home", "matches", "matchList", match.name]} />
                </div>
            </div>
            <HorizontalBar className="w-full h-[2px]" />
            <div className="h-20 flex flex-row gap-2 justify-center items-center w-full">
                <div className={`h-12 ${ match.win == null ? "w-[44%]" : "w-[48%]" } flex flex-row gap-2 justify-end items-center`}>
                    <div> {blueSide.team.name} </div>
                    <div>
                        <Image height={48} width={48} src={blueSide.team.icon} alt={blueSide.team.name}></Image>
                    </div>
                </div>
                { match.win === null && <div className="w-[12%]">quedan: { timeLeft }</div>}
                { ( !shown && match.win !== null ) &&
                <div className="h-10 w-[4%] flex justify-center items-center">
                    <button onClick={onHandleShown} className="h-10 w-10 border-black border-2 flex justify-center items-center hover:bg-stone-300">
                        { <FAI className="h-4" icon={showIcon}></FAI> }
                    </button>
                </div> }
                { shown && <div className="w-[4%]"> {result} </div>}
                <div className={`h-12 ${ match.win == null ? "w-[44%]" : "w-[48%]" } flex flex-row gap-2 justify-start items-center`}>
                    <div>
                        <Image height={48} width={48} src={redSide.team.icon} alt={redSide.team.name}></Image>
                    </div>
                    <div> {redSide.team.name} </div>
                </div>
            </div>
            { shown && <ExpandedView  blue={blueSide} red={redSide} /> }
            <div className="h-12 px-4 flex flex-row justify-center items-center text-xl w-full">
                <div> { parseMatchDate( match.date ) } </div>
            </div>
        </div>
    );
}
