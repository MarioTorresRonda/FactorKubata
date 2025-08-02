import { championsKeys } from "@/data/formattedChampionsKeys";
import Image from "next/image";
import Message from "../fragments/Message";

export default function RivalPlayerMatchesMultiple( { matches, puuid, matchesIMP } ) {

    const matchesFound = matches.filter( match => matchesIMP.indexOf( match.matchId ) != -1 );
    const matchesFoundObj =  {};
    matchesFound.map( ( match ) => {
        matchesFoundObj[match.matchId] = match;
    } )

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "totalGames"]} /> ( { matchesFound.length } ) </p>
        <div className="flex gap-4 flex-col">
        { matchesIMP.map( ( matchId ) => {
            const matchFound = matchesFoundObj[ matchId ];
            if ( matchFound ) {
                const champId = matchFound.info.participants[0].championId;
                return <div className="flex flex-row" key={matchFound.matchId}> 
                    <div className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative">
                        <Image 
                            fill={true} 
                            alt={champId} 
                            src={ championsKeys[champId].image } 
                        />
                    </div>
                    <p> { matchId } </p>
                </div> 
            }
            
            return <div key={matchId} className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative">
            </div>

        } ) }
        </div>
    </div>
}