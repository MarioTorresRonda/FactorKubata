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
    const [shown, setShown] = useState(false)

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
    }

    function onHandleShown() {
        setShown( prevShown => !prevShown );
    }
    
    const blueTeam = match.expandedView.blue.team;
    const redTeam = match.expandedView.red.team;

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
                    <div> {blueTeam.name} </div>
                    <div>
                        <Image height={48} width={48} src={blueTeam.icon} alt={blueTeam.name}></Image>
                    </div>
                </div>
                { match.win === null && <div className="w-[12%]">quedan: { timeLeft }</div>}
                { ( !shown && match.win !== null ) &&
                <div className="h-10 w-[4%] flex justify-center items-center">
                    <button onClick={onHandleShown} className="h-10 w-10 border-black border-2 flex justify-center items-center hover:bg-stone-300">
                        { <FAI className="h-4" icon={showIcon}></FAI> }
                    </button>
                </div> }
                { shown && <div className="w-[4%]"> {match.result} </div>}
                <div className={`h-12 ${ match.win == null ? "w-[44%]" : "w-[48%]" } flex flex-row gap-2 justify-start items-center`}>
                    <div>
                        <Image height={48} width={48} src={redTeam.icon} alt={redTeam.name}></Image>
                    </div>
                    <div> {redTeam.name} </div>
                </div>
            </div>
            { shown && <ExpandedView expandedView={match.expandedView} /> }
            <div className="h-12 px-4 flex flex-row justify-center items-center text-xl w-full">
                <div> { parseMatchDate( match.date ) } </div>
            </div>
        </div>
    );
}
