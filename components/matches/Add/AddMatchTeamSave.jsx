import ColoredButton from "@/components/fragments/ColoredButton"
import FAI from "@/components/fragments/FAI"
import Message from "@/components/fragments/Message"
import PrettyInput from "@/components/fragments/PrettyInput"
import PrettySelect from "@/components/fragments/PrettySelect"
import { faPlus, faSave } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import AddMatchPlayer from "./AddMatchPlayer"
import { toast } from "react-toastify"
import { useMessageText } from "@/hooks/useMessageText"
import { useFetch } from "@/hooks/useFetch"
import { createEspecialTeam, fetchEspecialTeams } from "@/data/fetch/especialsTeams"
import { getCookie } from "@/util/cookies"

export default function AddMatchTeamSave( { players, teamName, setTeams } ) {
            
    let controller = new AbortController();
    let signal = controller.signal;
    const getText = useMessageText();
    const [ token, setToken ] = useState("");

    useEffect(() => {
        setToken( () => {
            return getCookie("token");
        } );	
    }, [])

    async function saveTeam() {
        if ( players.length > 15 ) {
            toast( getText(["home", "matches", "maxLimitPlayers"]), { type:"error", theme:"colored" } );
        }else{
            event.preventDefault();
            event.stopPropagation();
    
            controller.abort();
            controller = new AbortController();
            signal = controller.signal;
            try{
                let res = await createEspecialTeam( { token, teamName, players }, { signal } );
                if ( res.result ) {
                    setTeams( oldTeams => {
                        const newTeams = [ ...oldTeams ];
                        newTeams.push( { id: res.id, name: teamName, players } );
                        return newTeams;
                    } );
                    toast( getText(["home", "scouting", "deleteTeamD"]).replace("#1", teamName ), { type:"success", theme:"colored" } );
                }
            }catch(e) {
                toast( e.toString(), { type:"error", theme:"colored" } );
            }
        }
    }

    return <button 
        className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
        onClick={saveTeam}>
        <FAI className="h-4 w-4" icon={faSave} />
        <Message code={["home", "matches", "saveTeam"]} /> 
    </button> 
}