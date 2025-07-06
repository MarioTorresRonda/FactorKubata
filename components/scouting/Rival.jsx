import { scouting } from "@/data/navBar";
import { useNavigate } from "@/hooks/useNavigate"

export default function Rival( {rival} ) {

    const { navigate } = useNavigate();

    function onHandleClick() {
        navigate(scouting, encodeURIComponent( rival.teamName ) )
    }

    return <button onClick={onHandleClick} className="bg-stone-300/50 hover:bg-stone-300/90 dark:bg-stone-700/50 hover:dark:bg-stone-700/90 py-6 px-4 text-left transition-all ease-in-out hover:scale-[102%] ">
        <p className="text-xl font-bold"> {rival.teamName} </p>
        <div className="flex flex-row gap-4">
            { Object.values( rival.players ).map( player => { return <p key={player.name} > {player.name} </p> } ) }
        </div>
    </button>
}