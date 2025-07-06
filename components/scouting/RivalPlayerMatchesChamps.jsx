import { championsKeys } from "@/data/formattedChampionsKeys";
import Image from "next/image";
import Message from "../fragments/Message";

export default function RivalPlayerMatchesChamps( { matches, role, onlyRole } ) {

    const loadedRoleChamps = matches.filter( match => { 
        if ( !onlyRole ) {
            return true;
        }
        return ( match.info.participants[0].teamPosition == role );
    } )

    let champPlayed = loadedRoleChamps.map( match => match.info.participants[0].championId )  
    let champCounts = {};
    champPlayed.forEach( champ => {
        champCounts[champ] = champCounts[champ] == undefined ? 1 : champCounts[champ] + 1;
    } )
    champCounts = Object.keys( champCounts ).map( ( champ ) => { return { key: champ, games: champCounts[champ] } } )
    champCounts = champCounts.sort( (a, b) => b.games - a.games  )

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "totalGames"]} /> ( { loadedRoleChamps.length } ) </p>
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