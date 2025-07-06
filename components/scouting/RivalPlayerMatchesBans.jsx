import { championsKeys } from "@/data/formattedChampionsKeys";
import { useFetch } from "@/hooks/useFetch"
import { fetchMatches } from "@/http";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Message from "../fragments/Message";

export default function RivalPlayerMatchesBans( { matches, role, onlyRole } ) {

    let champsBanned = matches.map( match => match.info.participants[0].banId ).filter( element =>  element !== undefined );  
    let champCounts = {};
    champsBanned.forEach( champ => {
        if ( champ ) {   
            champCounts[champ] = champCounts[champ] == undefined ? 1 : champCounts[champ] + 1;
        }
    } )
    champCounts = Object.keys( champCounts ).map( ( champ ) => { return { key: champ, games: champCounts[champ] } } )
    champCounts = champCounts.sort( (a, b) => b.games - a.games  )

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "totalBans"]} /> ( { champsBanned.length } ) </p>
        <div className="flex gap-4 flex-wrap h-[116px] overflow-y-scroll">
        { champCounts.map( ( champ ) => {
            return <div key={champ.key} className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative">
                <Image fill={true} alt={champ.key} src={ championsKeys[champ.key].image } />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-stone-900/50 text-white dark:bg-stone-900/70 text-center pt-3 font-bold text-xl">
                   {champ.games} 
                </div>
            </div>
        } ) }
        </div>
    </div>
}