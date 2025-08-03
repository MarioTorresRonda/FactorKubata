'use client'

import Message from "../fragments/Message"
import { fetchRoleChamps } from "@/http"
import { rolesObj } from "@/data/roles"
import { useFetch } from "@/hooks/useFetch"
import { useState } from "react"
import ChampionImage from "../fragments/ChampionImage"

function levelColor( level ) {
    if ( level > 100 ) {
        return "bg-red-800/50"
    }
    if ( level > 70 ) {
        return "bg-red-500/50"
    }
    if ( level > 50 ) {
        return "bg-orange-700/50"
    }
    if ( level > 40 ) {
        return "bg-orange-500/50"
    }
    if ( level > 30 ) {
        return "bg-yellow-700/50"
    }
    if ( level > 20 ) {
        return "bg-yellow-500/50"
    }
    if ( level > 10 ) {
        return "bg-green-500/50"
    }
    if ( level <= 10 ) {
        return "bg-green-800/50"
    }
}

export default function RivalPlayerMasteries( { masteries, player, onlyRole } ) {

    const [roleBody, setRoleBody] = useState( { role: rolesObj[player.role].op } );

    const {
        isFetching, 
        fetchedData : champions,
        error,
        setFetchedData : setMatchList
    } = useFetch( fetchRoleChamps, roleBody, { list: [] }, [] );

    masteries = masteries.filter( mastery => { return !onlyRole || champions.list.find( champion => champion.key == mastery.championId ) } )


    return <>
        <div className="flex flex-col max-h-[400px] h-[30vh] min-h-[250px] overflow-y-scroll" style={{lineHeightStep: "50px"}} >
            { masteries.map( mastery => {
                return <div key={mastery.championId} className={`flex flex-row gap-2 h-full ${levelColor(mastery.championLevel)}`}>
                    <div className="aspect-square w-[50px] h-[50px] max-w[50px] max-h-[50px] relative">
                        <ChampionImage  fill={true} championId={mastery.championId} />
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-stone-900/50 text-white dark:bg-stone-900/70 text-center pt-3 font-bold text-xl">
                            {mastery.championLevel}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full mr-2">
                        <div className="flex flex-row justify-between">
                            <p> <Message code={["home", "scouting", "mastery", "points"]} /> {mastery.championPoints } </p>
                            <p className="text-ellipsis" > { Math.round( mastery.championPoints / 800 ) }<Message code={["home", "scouting", "mastery", "games"]} />  </p>
                        </div>
                    </div>
                </div>
            } ) }
        </div>
    </>
}