import ChampionImage from "@/components/fragments/ChampionImage";
import FAI from "@/components/fragments/FAI";
import ItemImage from "@/components/fragments/ItemImage";
import { useMessageText } from "@/hooks/useMessageText";
import { copyTextToClipboard } from "@/util/clipboard";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function AddMatchGameDataPLayer( { player } ) {

    const getText = useMessageText();
    const teamPlayer = { name: "Prueba" };

    const items = [ player.ITEM0, player.ITEM1, player.ITEM2, player.ITEM3, player.ITEM4, player.ITEM5, player.ITEM6 ];

    function copyPUUIDToClipboard() {  
        copyTextToClipboard( player.PUUID );              
        toast( getText(["commons", "clipboard", "copy"]), { type:"success", theme:"colored" } );
    }

    return <div className="flex flex-row w-full sm:h-16">
        <div className={"relative h-auto w-min aspect-square"}> 
            <ChampionImage fill={true} championId={player.SKIN} />
        </div>
        <div className={"w-[40%] flex-1 flex flex-col px-2 justify-center gap-2"}> 
            <div className="w-full flex flex-row">
                <p className="text-sm text-nowrap overflow-ellipsis overflow-hidden"> {teamPlayer.name} </p>
            </div>
            <div className="w-full flex flex-row">
                <p className="text-sm text-nowrap overflow-ellipsis overflow-hidden"> {player.PUUID} </p>
                <button 
                    className="bg-stone-300 dark:bg-stone-700 p-1 px-2 gap-1 rounded-md flex flex-row items-center justify-center"
                    onClick={copyPUUIDToClipboard}>
                    <FAI className="h-4 w-4" icon={faClipboard} />
                </button> 
            </div>
        </div>
        <div className={`w-[40%] min-w-[40%] bg-stone-900/20 h-min self-center flex flex-row justify-between`}>
            { items.map( (item, index) => {
                return (
                    <div className="relative w-[calc(100%/6)] h-min aspect-square " key={item + index}>
                        { item != 0 && <ItemImage fill={true} itemId={item} /> }
                    </div>
                )
            } ) }
        </div>
    </div>
}