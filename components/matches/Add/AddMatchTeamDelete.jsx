import FAI from "@/components/fragments/FAI"
import Message from "@/components/fragments/Message"
import { deleteEspecialTeam } from "@/data/fetch/especialsTeams";
import { useMessageText } from "@/hooks/useMessageText";
import { getCookie } from "@/util/cookies";
import { faCross, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddMatchTeamDelete( { teamName, setTeams, setTeamById } ) {

    let controller = new AbortController();
    let signal = controller.signal;
    const getText = useMessageText();
    const [ token, setToken ] = useState("");

    useEffect(() => {
        setToken( () => {
            return getCookie("token");
        } );	
    }, [])

async function deleteTeam(event) {
            event.preventDefault();
            event.stopPropagation();
    
            controller.abort();
            controller = new AbortController();
            signal = controller.signal;
            try{
                let res = await deleteEspecialTeam( { token, teamName }, { signal } );
                if ( res.result ) {
                    setTeams( oldTeams => {
                        let newTeams = [ ...oldTeams ];
                        newTeams = newTeams.filter( ( team ) => {
                            return team.name != teamName;
                        })
                        return newTeams;
                    } );
                    setTeamById(-1)
                    toast( getText(["home", "scouting", "deleteTeamD"]).replace("#1", teamName ), { type:"success", theme:"colored" } );
                }
            }catch(e) {
                toast( e.toString(), { type:"error", theme:"colored" } );
            }
    }

    return <button 
        className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
        onClick={deleteTeam}>
        <FAI className="h-4 w-4" icon={faTrash} />
        <Message code={ ["home", "matches", "deleteTeam"] } />        
    </button> 
}