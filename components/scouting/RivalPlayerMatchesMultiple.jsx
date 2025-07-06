import { championsKeys } from "@/data/formattedChampionsKeys";
import Image from "next/image";
import Message from "../fragments/Message";

export default function RivalPlayerMatchesMultiple( { matches, puuid, matchesIMP } ) {

    const matchesFound = matches.filter( match => matchesIMP.indexOf( match.matchId ) != -1 );

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "totalGames"]} /> ( { matchesFound.length } ) </p>
        <div className="flex gap-4 flex-col">
        { matchesFound.map( ( match ) => {
            const champId = match.info.participants[0].championId;
            console.log( match, champId )
             return <div key={match.matchId}> 
                    <div className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative">
                    <Image 
                        fill={true} 
                        alt={champId} 
                        src={ championsKeys[champId].image } 
                    />
                </div>
            </div> 
        } ) }
        </div>
    </div>
}