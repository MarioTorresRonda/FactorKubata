'use client'

import Message from "@/components/fragments/Message";
import HorizontalBar from "@/components/fragments/HorizontalBar";
import {teams} from "@/data/teams";
import FAI from "@/components/fragments/FAI";

import { faEyeSlash as showIcon } from "@fortawesome/free-solid-svg-icons"
import { parseMatchDate } from "@/util/dates";
import { useState } from "react";
import ExpandedView from "./ExpandedView";
import MatchSide, { side } from "./MatchSide";
import MatchCountdown from "./MatchCountdown";
import MatchGames from "./MatchGames";
import { matchColorByWins } from "@/util/MatchUtils";

export default function Match({match, mainPanel}) {
    const [shown, setShown] = useState(false);
    const [hover, setHover] = useState(false)

    const firstTeam = match.games[0].blue;
    const secondTeam = match.games[0].red;
    const firstTeamKubata = firstTeam?.name == teams.factorKubata.name;
    const gamesPlayed = match.games.find( game => game.win !== null );

    let firstTeamWins = 0;
    let secondTeamWins = 0;
    let result = "";
        
    let backgroundColor = "bg-stone-200";
    if ( shown ) {

        match.games.forEach( game => {
            if ( game.win === null ) {
                return;
            }

            if( game.win  ) {
                if ( firstTeamKubata ) {
                    firstTeamWins++;
                }else{
                    secondTeamWins++;
                }
            }else{
                if ( !firstTeamKubata ) {
                    firstTeamWins++;
                }else{
                    secondTeamWins++;
                }
            }
        } )
        result = ` ${firstTeamWins} - ${secondTeamWins} `;
        
        backgroundColor = matchColorByWins( firstTeamWins, secondTeamWins, firstTeamKubata );
    }

    let hoverStyle = {"transform": "rotateY(0deg) rotateX(0deg)"}
    if ( !shown && hover ) {
        hoverStyle = {"transform": randomRotate() }
    }

    function randomRotate() {
        return `rotateY(${ ( (Math.random() * 10) - 5 ) }deg) rotateX(${ ( (Math.random() * 10) - 5 ) }deg)`;
    }

    function onHandleShown() {
        setShown( prevShown => !prevShown );
    }

    function onHandleHover() {
        setHover(true)
    }
    function onHandleLeave() {
        setHover(false)
    }

    return (
        <div className="lg:w-2/3 *:transition-all duration-300"
            style={{perspective: "1000px", transformStyle: "preserve-3d"}} 
            onMouseEnter={onHandleHover}
            onMouseLeave={onHandleLeave} >
            <div 
                className={`${backgroundColor} shadow-md shadow-gray-800 dark:shadow-black text-stone-900`}
                style={hoverStyle}
                >
                <div className="h-12 px-4 flex flex-row justify-center items-center text-xl">
                    <div>
                        <Message code={["home", "matches", "matchList", match.name]} />
                    </div>
                </div>
                <HorizontalBar className="w-full h-[2px]" />
                <div className="h-20 flex flex-row gap-2 justify-center items-center w-full">
                    <MatchSide 
                        className={`h-12 ${ match.win == null ? "w-[44%]" : "w-[48%]" }`}  
                        teamSide={side.blue}
                        team={firstTeam}
                    />
                    { !gamesPlayed && <MatchCountdown match={match} />}
                    { ( !shown && gamesPlayed ) &&
                    <div className="h-10 w-[4%] flex justify-center items-center">
                        <button onClick={onHandleShown} className="h-10 w-10 border-black border-2 flex justify-center items-center hover:bg-stone-300">
                            { <FAI className="h-4" icon={showIcon}></FAI> }
                        </button>
                    </div> }
                    { shown && <div className="w-[4%] text-center"> {result} </div>}
                    <MatchSide 
                        className={`h-12 ${ match.win == null ? "w-[44%]" : "w-[48%]" }`}  
                        teamSide={side.red}
                        team={secondTeam}
                    />
                </div>
                { mainPanel && shown && <MatchGames  games={ match.games } /> }
                <div className="h-12 px-4 flex flex-row justify-center items-center text-xl w-full">
                    <div> { parseMatchDate( match.date ) } </div>
                </div>
            </div>
        </div>
    );
}
