import { useFetch } from "@/hooks/useFetch"
import { fetchMatches } from "@/http";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Message from "../fragments/Message";
import RivalPlayerMatchesChamps from "./RivalPlayerMatchesChamps";
import RivalPlayerMatchesBans from "./RivalPlayerMatchesBans";
import RivalPlayerMatchesMultiple from "./RivalPlayerMatchesMultiple";
import RivalPlayerMatchesLastChamps from "./RivalPlayerMatchesLastChamps";

export default function RivalPlayerMatches( { matches, player, puuid, onlyRole, matchesIMP } ) {

    const [matchBody, setMatchBody] = useState({ matchList : matches, puuid });
    const [loadedMatches, setLoadedMatches] = useState([]);

    const {
        isFetching, 
        fetchedData : resultMatches,
        error,
        setFetchedData : setMatchGame
    } = useFetch( fetchMatches, matchBody, null, [] );

    useEffect(() => {
        let timer = null;

        if ( resultMatches ) {
            if ( resultMatches.matches.length > 0 ) {
                setLoadedMatches( prevLoadedMatches => {
                    const newLoadedMatches = [...prevLoadedMatches];
                    newLoadedMatches.push( ...resultMatches.matches );
                    return newLoadedMatches;
                } );
            }
            if ( resultMatches.notFetched.length ) {
                timer = setTimeout( () => {
                    setMatchBody( { matchList : resultMatches.notFetched, puuid } )
                }, 30000);
            }
            
        }
        return () => {
            if ( timer ) {
                clearTimeout( timer );
            }
        }
    }, [puuid, resultMatches]);

    return <>
        <div className="mx-2">
            { resultMatches && resultMatches.notFetched.length > 0 && 
            <p>
                <Message code={["home", "scouting", "matches", "notLoaded"]} /> 
                { resultMatches.notFetched.length } 
                <Message code={["home", "scouting", "matches", "matches"]} />
            </p> }
            <RivalPlayerMatchesLastChamps matches={loadedMatches} onlyRole={onlyRole} role={player.role}/>
            <RivalPlayerMatchesChamps matches={loadedMatches} onlyRole={onlyRole} role={player.role}/>
            <RivalPlayerMatchesBans matches={loadedMatches} onlyRole={onlyRole} role={player.role}/>
        </div>
        <RivalPlayerMatchesMultiple matches={loadedMatches} matchesIMP={matchesIMP} />
    </>
}