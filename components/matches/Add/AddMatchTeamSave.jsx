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
import { createEspecialTeam, updateEspecialTeam } from "@/data/fetch/especialsTeams"
import { getCookie } from "@/util/cookies"

export default function AddMatchTeamSave( { teamId, players, teamName, image, setTeams, setTeamById } ) {
            
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
                if ( teamId == -1 ) {
                    let res = await createEspecialTeam( { token, teamName, players, image }, { signal } );
                    if ( res.result ) {
                        setTeams( oldTeams => {
                            const newTeams = [ ...oldTeams ];
                            newTeams.push( { _id: res._id, name: teamName, players } );
                            return newTeams;
                        } );
                        setTeamById( res._id );
                        toast( getText(["home", "matches", "saveTeamD"]).replace("#1", teamName ), { type:"success", theme:"colored" } );
                    }
                }else{
                    let res = await updateEspecialTeam( { token, teamName, players, image }, { signal } );
                    if ( res.result ) {
                        setTeams( oldTeams => {
                            const newTeams = [ ...oldTeams ];
                            oldTeams.forEach( newTeam => {
                                if ( newTeam._id == res._id ) {
                                    newTeam.name = teamName;
                                    newTeam.players = players;
                                    newTeam.image = image;
                                }
                            } );
                            return newTeams;
                        } );
                        setTeamById( res._id );
                        toast( getText(["home", "matches", "saveTeamD"]).replace("#1", teamName ), { type:"success", theme:"colored" } );
                    }
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