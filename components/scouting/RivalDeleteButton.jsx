import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import FAI from "../fragments/FAI";
import { toast } from "react-toastify"
import { useMessageText } from "@/hooks/useMessageText";
import { useEffect, useState } from "react";
import { getCookie } from "@/util/cookies";
import { deleteTeam } from "@/data/fetch/team";

export default function RivalDeleteButton( {teamName, setRivals} ) {
    
    let controller = new AbortController();
    let signal = controller.signal;
    const getText = useMessageText();

    const [teamsBody, setTeamsBody] = useState({ teamName })

    useEffect(() => {
        setTeamsBody( oldTeamsBody => { 
            const newTeamsBody = {...oldTeamsBody};
            newTeamsBody.token = getCookie("token");
            return newTeamsBody;
        });
    }, [])

    async function onClick( event ) {
        event.preventDefault();
        event.stopPropagation();

        controller.abort();
        controller = new AbortController();
        signal = controller.signal;
        try{
            let res = await deleteTeam( teamsBody );
            if ( res ) {
                setRivals( oldRivals => {
                    const newRivals = [];
                    oldRivals.forEach(rival => {
                        if ( rival.teamName != teamName ) {
                            newRivals.push( rival );
                        }
                    });
                    return newRivals;
                } );
                toast( getText(["home", "scouting", "deleteTeamD"]).replace("#1", teamName ), { type:"success", theme:"colored" } );
            }
        }catch(e) {
            toast( e.toString(), { type:"error", theme:"colored" } );
        }

    }
    
    return <button className="flex flex-row h-10 w-10 items-center justify-center self-center bg-stone-500/50 hover:scale-[104%]" onClick={ onClick } >
        <FAI icon={faTrashCan} className="h-4" />
    </button>

}