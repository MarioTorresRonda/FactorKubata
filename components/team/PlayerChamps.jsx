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
    
    return <div className="h-full flex flex-col gap-4 justify-center">
        { sortedChamps.slice(0, 3).map( champ => {
            const gameText = champ.times > 1 ? <Message code={["home", "team", "players", "games"]} /> : <Message code={["home", "team", "players", "game"]} />
            return ( <div key={champ.name} className="text-xl w-20 flex flex-row gap-2"> 
                <Image alt={champ.name} src={ champions[champ.name].image }></Image>
                <div className="flex flex-col justify-center">
                    <p className="text-nowrap"> {champ.times} { gameText } </p>
                    <div className="flex flex-row gap-1">
                        <p className="text-nowrap">{ Math.round( 100 / champ.times * champ.wins )}%</p> 
                        <p className="text-base text-green-400/80"> {champ.wins}V </p>
                        <p className="text-base text-red-400/80"> { champ.times - champ.wins}D </p>
                    </div>
                </div>
            </div> )
        } ) }
    </div>
}