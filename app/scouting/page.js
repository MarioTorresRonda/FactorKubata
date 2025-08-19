'use client'

import {Roboto_Condensed} from "next/font/google";

const backgroundList = [bg1, bg2, bg3, bg4];

import bg1 from "@/public/backgrounds/1V.jpeg";
import bg2 from "@/public/backgrounds/2V.jpeg";
import bg3 from "@/public/backgrounds/3V.jpeg";
import bg4 from "@/public/backgrounds/4V.jpeg";
import Message from "@/components/fragments/Message";
import { useEffect, useRef, useState } from "react";
import NewRival from "@/components/scouting/NewRival";
import FAI from "@/components/fragments/FAI";
import { faPlus, faSubtract } from "@fortawesome/free-solid-svg-icons";
import Rival from "@/components/scouting/Rival";
import { useFetch } from "@/hooks/useFetch";
import { getCookie } from "@/util/cookies";
import { fetchTeams } from "@/data/fetch/team";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {

    const [adding, setAdding] = useState(false)
    const [teamsBody, setTeamsBody] = useState({})
    const newRivalRef = useRef()

    const {
        isFetching, 
        fetchedData : rivals,
        error,
        setFetchedData : setRivals
    } = useFetch( fetchTeams, teamsBody, [], [] );

    useEffect(() => {
      setTeamsBody( { token : getCookie("token") } );
    }, []);

    function onHandleNewRival() {
        setAdding( !adding );
        setTimeout(() => {
            newRivalRef.current.reset();
        }, 300);
    }

    return (
        <main className="mb-32 w-full h-full flex flex-col items-center justify-center mt-8">
            <p className={`text-[52px] font-bold  ${font.className}`}>
                <Message code={["home", "scouting", "title"]} />
            </p>
            <div className="flex flex-col w-full lg:w-2/3">
                <div className="w-full text-2xl bg-stone-300 dark:bg-stone-600 flex flex-row justify-between items-center h-20 px-4">
                    <Message code={["home", "scouting", "teams"]} />
                    <button className="py-2 px-4 bg-stone-200 dark:bg-stone-500 text-sm h-min rounded-md flex flex-row gap-2 items-center" onClick={onHandleNewRival}> 
                        { adding && <>
                            <FAI icon={faSubtract} className="h-4" />  
                            <Message code={["home", "scouting", "close"]} />
                        </> }
                        { !adding && <>
                            <FAI icon={faPlus} className="h-4" />  
                            <Message code={["home", "scouting", "add"]} />
                        </> }
                        
                    </button>
                </div>
                <div className={`bg-stone-400/50 dark:bg-stone-600/50 mx-2 transition-all duration-300 ease-in-out ${adding ? "max-h-[500px] overflow-auto" : "max-h-0 overflow-hidden"} `}> 
                    <NewRival ref={newRivalRef}/> 
                </div>
                { isFetching && <div className="w-full"> Loading... </div> }
                { error && <div className="w-full bg-red-400 text-stone-800 py-4"> 
                    <p className="text-center"> Error: { error.message } </p>
                    </div> }
                { !error && !isFetching && (
                    <div className="w-full flex flex-col px-2 py-4 gap-4">
                        { rivals.map( (rival) => {
                            return <Rival key={rival.teamName} rival={rival} setRivals={setRivals} />
                        } ) }
                    </div>
                ) }
            </div>
        </main>
    );
}
