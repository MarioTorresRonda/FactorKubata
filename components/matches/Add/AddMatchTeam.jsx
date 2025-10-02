import ColoredButton from "@/components/fragments/ColoredButton"
import FAI from "@/components/fragments/FAI"
import Message from "@/components/fragments/Message"
import PrettyInput from "@/components/fragments/PrettyInput"
import PrettySelect from "@/components/fragments/PrettySelect"
import { faImage, faPlus, faSave } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import AddMatchPlayer from "./AddMatchPlayer"
import { toast } from "react-toastify"
import { useMessageText } from "@/hooks/useMessageText"
import { useFetch } from "@/hooks/useFetch"
import { createEspecialTeam, fetchEspecialTeams } from "@/data/fetch/especialsTeams"
import { getCookie } from "@/util/cookies"
import AddMatchTeamSave from "./AddMatchTeamSave"
import AddMatchTeamEdit from "./AddMatchTeamEdit"
import AddMatchTeamDelete from "./AddMatchTeamDelete"
import MatchTeamIcon from "../MatchTeamIcon"
import { toBase64 } from "@/util/img"
import { anonTeam, getNewID, newTeam } from "./AddMatchFunctions"

const sides = {
    1: "bg-orange-500/20",
    2: "bg-purple-500/20",
}



export default function AddMatchTeam( { side, team, setTeam } ) {
        
    const getText = useMessageText();

    const iconTeam = useRef(null)
    const [ editable, setEditable ] = useState(false);
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
        setTeamById( event.target.value )
    }

    function setTeamById( teamId ) {
        if ( teamId == -2 ) {
            setTeam( anonTeam(getText) )
            setEditing( false );
            setEditable( false );
        }else if ( teamId == -1 ) {
            setTeam( newTeam() )
            setEditing( true );
            setEditable( false );
        }else{
            resetTeam( teamId )
            setEditing( false );
            setEditable( true );
        }
    }

    function resetTeam( teamId ) {
        const team = { ...teams.find( (team) => { return team._id == teamId} ) };
        team.players = team.players.map( player => { return {...player}} );
        setTeam( team )
    }

    function AddNewPlayer() {
        if ( team.players.length > 15 ) {
            toast( getText(["home", "matches", "maxLimitPlayers"]), { type:"error", theme:"colored" } );
        }else{
            setTeam( oldTeam => {
                const newTeam = {...oldTeam}
                const newPLayers = [...newTeam.players];
                newPLayers.push( { name: "", uuid: "", id: getNewID( oldTeam.players ) } );
                newTeam.players = newPLayers;
                return newTeam;
            } )
        }
    }

    function setPlayer( id, newValue, field ) {

        setTeam( oldTeam => {
            const newTeam = {...oldTeam}
            const newPLayers = [...newTeam.players];
            const player = newPLayers.filter( ( player ) => { return player.id == id } )[0];
            player[field] = newValue;
            newTeam.players = newPLayers;
                return newTeam;
        } );
    }

    function OnHandleUpdateName(event) {
        const name = event.target.value;
        setTeam( oldTeam => {
            const newTeam = { ...oldTeam };
            newTeam.name = name;
            return newTeam;
        } )
    }

    function onClickIconTeam(){
        iconTeam.current.click()
    }

    async function OnHandleUpdateIcon(){
        const file = iconTeam.current.files[0];
        const image = await toBase64(file)
        setTeam( (oldTeam) =>  {
            const newTeam = {...oldTeam}
            newTeam.image = image;
            return newTeam;
        })
    }

    return <div className={`${sides[side]} w-1/2 flex flex-col`}>
        <div className="bg-red-400">
            {error && error.message}
        </div>
        <div className="flex flex-row justify-between p-4">
            <p className="font-bold text-lg"> <Message code={["home", "matches", "addMatchTeamSide"]} /> {side} </p>
            <div className="flex flex-row">
                <p> <Message code={["home", "matches", "addMatchTeamSelect"]} /> </p>
                <PrettySelect className="w-40 rounded-md h-8" value={team._id} onChange={onHandleUpdateRole}>
                    { teams.map( (team) => {
                        return <option key={team._id} value={team._id}> {team.name} </option> 
                    } )  }
                    <option value="-2"> <Message code={["home", "matches", "addMatchTeamSelectAnon"]} /> </option> 
                    <option value="-1"> <Message code={["home", "matches", "addMatchTeamSelectNew"]} /> </option> 
                </PrettySelect>
            </div>
        </div>
        <div className="flex flex-row bg-stone-800/20">
            <div className="flex flex-col flex-1">
                <div className="flex flex-row w-full gap-2 items-center  px-6 py-2">
                    { !editing  && <p className="pl-2"> {team.name} </p> }
                    { editing && <>
                        <p className=""> <Message code={["home", "matches", "addMatchTeamName"]} /> </p>
                        <PrettyInput className="w-60 rounded-md" value={team.name} onChange={OnHandleUpdateName} ></PrettyInput> 
                        <input className="hidden" type="file" ref={iconTeam} onChange={OnHandleUpdateIcon} ></input>
                    </> }
                </div>
                <div className="flex flex-row w-full gap-2 items-center px-6 py-2">
                    { editable && 
                        <>
                            <AddMatchTeamEdit  editing={editing} setEditing={setEditing} team={team} resetTeam={resetTeam} />
                            { !editing && <AddMatchTeamDelete teamName={team.name} setTeams={setTeams} setTeamById={setTeamById} /> }
                        </>
                    }
                    { editing && <>
                            <button 
                                className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
                                onClick={AddNewPlayer}>
                                <FAI className="h-4 w-4" icon={faPlus} />
                                <Message code={["home", "matches", "addMatchTeamPlayer"]} /> 
                            </button> 
                            <AddMatchTeamSave teamId={team._id} players={team.players} teamName={team.name} image={team.image} setTeams={setTeams} setTeamById={setTeamById} />
                            <button 
                                className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
                                onClick={onClickIconTeam}>
                                <FAI className="h-4 w-4" icon={faImage} />
                                <Message code={["home", "matches", "iconTeam"]} /> 
                            </button> 
                        </>
                    }
                </div>
            </div>
            <div className="h-16 w-min aspect-square ">
                <MatchTeamIcon name={team.name} imgBase64={team.image} />
            </div>
        </div>
        <div className="flex flex-col w-full gap-2 bg-stone-800/20 ">
            { team.players.map( (player) => {
                return <AddMatchPlayer key={player.id} player={player} editing={editing} setPlayer={setPlayer} />
            } ) }
        </div>
    </div>
}