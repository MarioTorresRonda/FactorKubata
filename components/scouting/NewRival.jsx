import { forwardRef, useImperativeHandle, useState } from "react"
import Message from "../fragments/Message"
import PrettyInput from "../fragments/PrettyInput"
import PrettySelect from "../fragments/PrettySelect"
import { roles, top } from "@/data/roles"
import FAI from "../fragments/FAI"
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons"
import { createTeam, fetchTeam } from "@/http"
import { toast } from "react-toastify"
import { scouting } from "@/data/navBar"
import { useNavigate } from "@/hooks/useNavigate"

const player = {
    name: "",
    tag: "",
    role: top.roleId
}

export default forwardRef( function NewRival( {}, ref ) {
    const [players, setPlayers] = useState({ 0 : {...player} });
    const [name, setName] = useState("");
    const { navigate } = useNavigate();

    let controller = new AbortController();
    let signal = controller.signal;

    useImperativeHandle(ref, () => ({

        reset() {
            setPlayers( { 0 : {...player} } );
            setName("");
        }

    }));

    function onHandleAddPlayer() {
        setPlayers( ( prevPlayers ) => {
            const newPLayes = {...prevPlayers}
            const nextId = Object.keys(prevPlayers).length;
            newPLayes[ nextId ] = {...player};
            return newPLayes;
        } )
    }

    async function onHandleSaveTeam() {
        controller.abort();
        controller = new AbortController();
        signal = controller.signal;
        try{
            let rival = await createTeam( { teamName : name, players : players }, signal );
            if ( rival.teamName ) {
                navigate(scouting, encodeURIComponent( rival.teamName ) )
            }
        }catch(e) {
            toast( e.toString(), { type:"error", theme:"colored" } );
        }
    }

    function onHandleUpdateTeamName(event) {
        setName( event.target.value );
    }

    function onHandleUpdateName(event, id) {
        setPlayers( ( prevPlayers ) => {
            const newPLayes = {...prevPlayers}
            newPLayes[id].name = event.target.value;
            return newPLayes;
        } )
    }

    function onHandleUpdateTag(event, id) {
        setPlayers( ( prevPlayers ) => {
            const newPLayes = {...prevPlayers}
            newPLayes[id].tag = event.target.value;
            return newPLayes;
        } )
    }

    function onHandleUpdateRole(event, id) {
        setPlayers( ( prevPlayers ) => {
            const newPLayes = {...prevPlayers}
            newPLayes[id].role = event.target.value;
            return newPLayes;
        } )
    }

    return <div className="w-full flex flex-col gap-4 px-4 py-6">
        <div className="flex flex-row w-full gap-2 items-center">
            <Message code={["home", "scouting", "name"]} />
            <PrettyInput  value={name} onChange={(event) => {onHandleUpdateTeamName(event)}} className="w-60 rounded-md" ></PrettyInput>
        </div>
        <div className="flex flex-row w-full justify-between">
            <button className="py-2 px-4 bg-stone-200 dark:bg-stone-500 text-sm h-min rounded-md flex flex-row gap-2 items-center" onClick={onHandleAddPlayer}> 
                <FAI icon={faPlus} className="h-4" />  
                <Message code={["home", "scouting", "addPlayer"]} />
            </button>
            <button className="py-2 px-4 bg-stone-200 dark:bg-stone-500 text-sm h-min rounded-md flex flex-row gap-2 items-center" onClick={onHandleSaveTeam}> 
                <FAI icon={faCheck} className="h-4" />  
                <Message code={["home", "scouting", "saveTeam"]} />
            </button>
        </div>
        <div className="gap-4 flex flex-col ">
            { Object.keys(players).map( id => {        
                
                let player = players[id];
                
                return <div key={id} className="flex flex-row items-center "> 
                    <Message code={["home", "scouting", "player", "name"]} />:
                    <PrettyInput className="w-40 rounded-md h-8 mr-8" value={player.name} onChange={(event) => {onHandleUpdateName(event, id)}}/>
                    <Message code={["home", "scouting", "player", "tag"]} />:
                    <PrettyInput className="w-40 rounded-md h-8 mr-8" value={player.tag} onChange={(event) => {onHandleUpdateTag(event, id)}}/>
                    <Message code={["home", "scouting", "player", "role"]} />:
                    <PrettySelect className="w-40 rounded-md h-8" value={player.role} onChange={(event) => {onHandleUpdateRole(event, id)}}>
                        { roles.map( (role) => {
                            return <option key={role.roleId} value={role.roleId}> <Message code={["home", "scouting", "roles", role.roleId ]} /> </option>
                        } ) }
                    </PrettySelect>
                </div>
            } ) }
        </div>
    </div>
});