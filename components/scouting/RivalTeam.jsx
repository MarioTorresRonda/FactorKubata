import { useCallback, useEffect, useState } from "react"
import RivalPlayer from "./RivalPlayer"
import { fetchMatchesInMultiplePlayers } from "@/http";
import { useFetch } from "@/hooks/useFetch";
import SliderCheck from "../fragments/SliderCheck";
import Message from "../fragments/Message";

export default function RivalTeam( { team } ) {

    const playersArray = Object.values( team.players );
    const [loadedPlayers, setLoadedPlayers] = useState([ playersArray[0] ]);
    const [onlyRole, setOnlyRole] = useState(true);
    const [teamsBody, setTeamsBody] = useState({ teamName : team.teamName, onlyAsFive : true });

    const {
        isFetching, 
        fetchedData : matchesIMP,
        error,
        setFetchedData : setMatchesIMP
    } = useFetch( fetchMatchesInMultiplePlayers, teamsBody, [], [] );

    const loadNextPlayer = useCallback(
      () => {
        if ( loadedPlayers.length < playersArray.length ) {
            setLoadedPlayers( prevLoadedPlayers => {
                const newLoadedPlayers = [...prevLoadedPlayers];
                newLoadedPlayers.push( playersArray[prevLoadedPlayers.length] )
                return newLoadedPlayers;
            } )
        }     
      },
      [loadedPlayers.length, playersArray],
    );

    function onHandleRoleClick() {
        setOnlyRole( !onlyRole )
    }

    function onHandleOnlyAsFiveClick() {
        setTeamsBody( (prevTeamsBody) => {
            const newTeamsBody = {...prevTeamsBody}
            newTeamsBody.onlyAsFive = !prevTeamsBody.onlyAsFive;
            return newTeamsBody;
        } )
    }

    return <>
        <div className="flex flex-row" >
            <div className="flex flex-row items-center">
                    <SliderCheck onClick={onHandleRoleClick} value={onlyRole} className="h-6 w-12" />
                    <Message code={["home", "scouting", "mastery", "onlyRole"]} />
                </div>
                <div className="flex flex-row items-center">
                    <SliderCheck onClick={onHandleOnlyAsFiveClick} value={teamsBody.onlyAsFive} className="h-6 w-12" />
                    <Message code={["home", "scouting", "mastery", "AsFive"]} />
                </div>
        </div>
        <div className="flex flex-wrap justify-center" >
            { loadedPlayers.map( ( player ) => {
                return <RivalPlayer key={player.name} player={player} onlyRole={onlyRole} onLoad={loadNextPlayer} matchesIMP={matchesIMP} /> 
            } ) }
        </div>
    </>
}