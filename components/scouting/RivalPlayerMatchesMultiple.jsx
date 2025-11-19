import Message from "../fragments/Message";
import ChampionImage from "../fragments/ChampionImage";
import Image from "next/image";
import { rolesObj } from "@/data/roles";

export default function RivalPlayerMatchesMultiple( { matches, puuid, matchesIMP } ) {

    const matchesFound = matches.filter( match => matchesIMP.indexOf( match.matchId ) != -1 );
    const matchesFoundObj =  {};
    matchesFound.map( ( match ) => {
        matchesFoundObj[match.matchId] = match;
    } )

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "playedTogether"]} /> ( { matchesFound.length } ) </p>
        <div className="flex flex-col">
        { matchesIMP.map( ( matchId, index ) => {

            const sharedClass = ` ${index % 2 ? "bg-stone-900" : "bg-stone-700/20" } w-full pb-2 `
            
            const matchFound = matchesFoundObj[ matchId ];
            if ( matchFound ) {
                const playerData = matchFound.info.participants[0];
                const champId = playerData.championId;
                const kda = Math.round ( ( playerData.kills + playerData.assists ) / ( playerData.deaths == 0 ? 1 : playerData.deaths )  * 100 ) / 100;

                return <div className={`flex flex-row ${sharedClass} items-center gap-2 `} key={matchFound.matchId}> 
                    <div className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative top-1">
                        <ChampionImage fill={true} championId={champId} />
                    </div>
                    <div className="flex flex-col w-16 items-end">
                        <p> { playerData.kills }/{ playerData.deaths }/{ playerData.assists } </p>
                        <p> { kda } kda. </p>
                    </div>
                    <div className="aspect-square w-[25px] max-w[25px] max-h-[25px] relative">
                        { playerData.teamPosition && <Image 
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={  playerData.teamPosition } 
                            src={ rolesObj[ playerData.teamPosition ].icon }
                        /> }
                    </div>
                    <div className="flex flex-col w-4 justify-center">
                        <p> Vs </p>
                    </div>
                    { playerData.vsId &&
                        <div className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative top-1">
                            <ChampionImage fill={true} championId={playerData.vsId} />
                        </div> 
                    }
                    { playerData.banId &&
                        <div className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative top-1">
                            <ChampionImage fill={true} championId={playerData.banId} />
                            <div className="absolute top-0 bottom-0 left-0 right-0 text-white bg-stone-950/70 text-center pt-7 font-bold text-xl"> </div>
                            <div className="absolute top-0 bottom-0 left-0 right-0 text-white bg-red-600/10 text-center pt-7 font-bold text-xl"> </div>
                        </div> 
                    }
                </div> 
            }
            return <div key={matchId} className={`${sharedClass}`}>
                <div className="aspect-square h-[50px] relative">
                </div>
            </div>

        } ) }
        </div>
    </div>
}