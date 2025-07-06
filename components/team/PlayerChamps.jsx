import { champions } from "@/data/formattedChampions"
import Image from "next/image"
import Message from "../fragments/Message"

export default function PlayerChamps( { playedChamps } ) {
    
    const sortedChamps = playedChamps.sort( ( a, b) => { 
        if ( b.times - a.times  != 0 ) {
            return b.times - a.times 
        }else{
            return b.wins - a.wins 
        }
    } )
    
    return <div className="h-full flex flex-row md:flex-col gap-4 justify-center md:my-auto md:pt-24  lg:pt-0 lg:my-0">
        { sortedChamps.slice(0, 3).map( champ => {
            const gameText = champ.times > 1 ? <Message code={["home", "team", "players", "games"]} /> : <Message code={["home", "team", "players", "game"]} />
            const winrate = Math.round( 100 / champ.times * champ.wins );
            
            return ( <div key={champ.name} className="text-xl w-20 flex flex-row gap-2"> 
                <div className="min-w-20 h-20 md:min-w-16 md:h-16 relative">
                    <Image fill="true" alt={champ.name} src={ champions[champ.name].image }></Image>
                    <div className="flex md:hidden">
                        <div className="absolute w-full h-full bg-stone-950/40"> </div>
                        <div className="absolute w-full h-full flex flex-col justify-evenly items-center"> 
                            <p> {champ.times} </p>
                            <p className={ winrate >= 50 ? "text-green-400" : "text-red-400"} > { winrate }% </p>
                            
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-col justify-center">
                    <p className="text-nowrap"> {champ.times} { gameText } </p>
                    <div className="flex flex-row gap-1">
                        <p className="text-nowrap">{ winrate }%</p> 
                        <p className="text-base text-green-400/80"> {champ.wins}V </p>
                        <p className="text-base text-red-400/80"> { champ.times - champ.wins}D </p>
                    </div>
                </div>
            </div> )
        } ) }
    </div>
}