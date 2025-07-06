import { useCallback, useEffect, useState } from "react"
import RivalPlayer from "./RivalPlayer"
import { fetchMatchesInMultiplePlayers } from "@/http";
import { useFetch } from "@/hooks/useFetch";

export default function RivalTeam( { team, onlyRole } ) {

    const playersArray = Object.values( team.players );
    const [loadedPlayers, setLoadedPlayers] = useState([ playersArray[0] ]);
    const [teamsBody, setTeamsBody] = useState({ teamName: team.teamName });

    const {
        isFetching, 
        fetchedData : resultMatches,
        error,
        setFetchedData : setMatchGame
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

    return <div className="flex flex-wrap justify-center gap-2" >
        { loadedPlayers.map( ( player ) => {
            return <RivalPlayer key={player.name} player={player} onlyRole={onlyRole} onLoad={loadNextPlayer} matchesIMP={resultMatches} /> 
        } ) }
    </div>
}