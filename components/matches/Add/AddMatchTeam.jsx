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
import AddMatchTeamSave from "./AddMatchTeamSave"

const sides = {
    1: "bg-orange-500/20",
    2: "bg-purple-500/20",
}

function anonTeam( getText ) {
    return { 
        id: -2,
        name: getText( ["home", "matches", "addMatchTeamSelectAnon"] )
    }
}

const anonPLayers = [
    { name: "???", uuid: "-1", id: 0 },
    { name: "???", uuid: "-1", id: 1 },
    { name: "???", uuid: "-1", id: 2 },
    { name: "???", uuid: "-1", id: 3 },
    { name: "???", uuid: "-1", id: 4 },
]

export default function AddMatchTeam( { side } ) {
        
    const getText = useMessageText();

    const [ team, setTeam ] = useState( anonTeam(getText) );
    const [ players, setPlayers ] = useState( anonPLayers );
    const [ editing, setEditing ] = useState(false);
    const [ especialMatchesTeamsBody, setEspecialMatchesTeamsBody] = useState( { token : "" } );

	const {
		isFetching,
		fetchedData: teams,
        error,
		setFetchedData: setTeams,
	} = useFetch(fetchEspecialTeams, especialMatchesTeamsBody, [], []);

    useEffect(() => {
        setEspecialMatchesTeamsBody( prevMatchListBody => {
            prevMatchListBody.token = getCookie("token");
            return {...prevMatchListBody};
        } )	
    }, [])


    function onHandleUpdateRole(event) {
        const teamId = event.target.value;
        if ( teamId == -2 ) {
            setTeam( anonTeam(getText) )
            setPlayers( anonPLayers );
            setEditing( false );
        }else if ( teamId == -1 ) {
            setTeam( { id: -1, name: "" } )
            setPlayers( [] );
            setEditing( true );
        }else{
            const team = teams.find( (team) => { return team._id == teamId} );
            setTeam( team )
            setPlayers( team.players );
            setEditing( false );
        }
    }

    function getNewID() {
        let newId;
        do{
            newId = Math.round(Math.random() * 10000);
        }while( players.filter( ( player ) => { player.id == newId } ).length == 1 );
        return newId;
    }

    function AddNewPlayer() {
        if ( players.length > 15 ) {
            toast( getText(["home", "matches", "maxLimitPlayers"]), { type:"error", theme:"colored" } );
        }else{
            setPlayers( oldPlayers => {
                const newPLayers = [...oldPlayers];
                newPLayers.push( { name: "", uuid: "", id: getNewID() } );
                return newPLayers;
            } )
        }
    }

    function setPlayer( id, newValue, field ) {
        setPlayers( oldPlayers => {
            const newPLayers = [...oldPlayers];
            const player = newPLayers.filter( ( player ) => { return player.id == id } )[0];
            player[field] = newValue;
            return newPLayers;
        } )
    }

    function OnHandleUpdateName(event) {
        const name = event.target.value;
        setTeam( oldTeam => {
            const newTeam = { ...oldTeam };
            newTeam.name = name;
            return newTeam;
        } )
    }

    return <div className={`${sides[side]} w-1/2 flex flex-col`}>
        <div className="bg-red-400">
            {error && error.message}
        </div>
        <div className="flex flex-row justify-between p-4">
            <p className="font-bold text-lg"> <Message code={["home", "matches", "addMatchTeamSide"]} /> {side} </p>
            <div className="flex flex-row">
                <p> <Message code={["home", "matches", "addMatchTeamSelect"]} /> </p>
                <PrettySelect className="w-40 rounded-md h-8" value={team.id} onChange={onHandleUpdateRole}>
                    { teams.map( (team) => {
                        return <option key={team._id} value={team._id}> {team.name} </option> 
                    } )  }
                    <option value="-2"> <Message code={["home", "matches", "addMatchTeamSelectAnon"]} /> </option> 
                    <option value="-1"> <Message code={["home", "matches", "addMatchTeamSelectNew"]} /> </option> 
                </PrettySelect>
            </div>
        </div>
        <div className="flex flex-row w-full gap-2 items-center bg-stone-800/20 px-6 py-2">
            <p className=""> <Message code={["home", "matches", "addMatchTeamName"]} /> </p>
            { !editing  && <p className="pl-2"> {} </p> }
            { editing && <PrettyInput className="w-60 rounded-md" value={team.name} onChange={OnHandleUpdateName} ></PrettyInput> }
        </div>
        <div className="flex flex-row w-full gap-2 items-center bg-stone-800/20 px-6 py-2">
            { editing && <>
                <button 
                    className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
                    onClick={AddNewPlayer}>
                    <FAI className="h-4 w-4" icon={faPlus} />
                    <Message code={["home", "matches", "addMatchTeamPlayer"]} /> 
                </button> 
                <AddMatchTeamSave players={players} teamName={team.name} setTeams={setTeams} />
            </>
            }
        </div>
        <div className="flex flex-col w-full gap-2 bg-stone-800/20 ">
            { players.map( (player) => {
                return <AddMatchPlayer key={player.id} player={player} editing={editing} setPlayer={setPlayer} />
            } ) }
        </div>
    </div>
}