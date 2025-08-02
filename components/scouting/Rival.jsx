import { scouting } from "@/data/navBar";
import { useNavigate } from "@/hooks/useNavigate"
import RivalDeleteButton from "./RivalDeleteButton";

export default function Rival( {rival, setRivals} ) {

    const { navigate } = useNavigate();

    function onHandleClick() {
        navigate(scouting, encodeURIComponent( rival.teamName ) )
    }

    return <div onClick={onHandleClick} className="flex flex-row justify-between bg-stone-300/50 hover:bg-stone-300/90 dark:bg-stone-700/50 hover:dark:bg-stone-700/90 py-6 px-4 text-left transition-all ease-in-out hover:scale-[102%] ">
        <div className="flex flex-col">
            <p className="text-xl font-bold"> {rival.teamName} </p>
            <div className="flex flex-row gap-4">
                { Object.values( rival.players ).map( player => { return <p key={player.name} > {player.name} </p> } ) }
            </div>
        </div>
        <RivalDeleteButton teamName={rival.teamName} setRivals={setRivals}/>
    </div>
}