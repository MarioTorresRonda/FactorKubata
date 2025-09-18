import FAI from "@/components/fragments/FAI"
import Message from "@/components/fragments/Message"
import { faCross, faEdit, faX } from "@fortawesome/free-solid-svg-icons"

export default function AddMatchTeamEdit( { editing, setEditing } ) {

    async function editTeam() {
        setEditing( editing => !editing );
    }

    return <button 
        className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
        onClick={editTeam}>
        { editing && <>
            <FAI className="h-4 w-4" icon={faX} />
            <Message code={ ["home", "matches", "stopEditTeam"] } /> 
        </> }
         { !editing && <>
            <FAI className="h-4 w-4" icon={faEdit} />
            <Message code={ ["home", "matches", "editTeam"] } /> 
        </> }
    </button> 
}