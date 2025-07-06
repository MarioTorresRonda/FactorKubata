
import Image from "next/image";

import PlayerName from "./PlayerName"
import KDA from "./KDA"

import { champions } from "@/data/formattedChampions";
import { itemsIDS } from "@/data/formattedItems";

export default function PlayerView( { team, player, infoShown, mainClass, infoClass, itemsClass, textClass } ) {

    const items = [ player.ITEM0, player.ITEM1, player.ITEM2, player.ITEM3, player.ITEM4, player.ITEM5, player.ITEM6 ];
    function getInfoShow( player, names ) {
        if ( Array.isArray( names ) ) {
            return names.map( name => player[name] ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
        }else{
            return player[names];
        }
    }

    return (
        <div className={`flex flex-col items-center sm:h-16 odd:bg-black/10 w-full pl-4 pr-4 sm:pr-0 py-4 sm:my-0 gap-2 sm:gap-0 ${mainClass}`}>
            <div className={`flex flex-row w-full sm:w-[60%] ${infoClass}`} >
                <div className={"w-[12%]"  }> <Image alt={player.SKIN} src={ champions[player.SKIN].image }></Image> </div>
                <PlayerName className={textClass} player={player} team={team}/>
                <KDA className={"w-[20%] flex items-center justify-center"} kills={player.CHAMPIONS_KILLED} deaths={player.NUM_DEATHS} assists={player.ASSISTS}  />
                <div className={"w-[23%] flex items-center justify-center"}> 
                    <p> { getInfoShow( player, infoShown.name ) } </p> 
                </div>
            </div>
            <div className="flex flex-row w-full max-w-[200px] sm:w-[35%] self-start md:self-center ">
                <div className={`w-full bg-stone-900/10 flex flex-row ${itemsClass}`}>
                    { items.map( (item, index) => {
                        return (
                            <div className="flex-1 relative min-w-[14.2%] aspect-square" key={item + index}>
                                { item != 0 && <Image fill={true} alt={item} src={itemsIDS[item].image}></Image> }
                            </div>
                        )
                    } ) }
                </div>
            </div>
        </div>
    )
}