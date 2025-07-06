import { formatMatchDate } from "./util/dates";
import { revalidatePath } from 'next/cache'

const lolApi = `/api/LoL`;

async function apiCall( url, signal ) {
    const response = await fetch( url, signal);
    if ( !response.ok ) {
        throw new Error('Failed server call');
    }

    return response;
}

export async function fetchMatchList( { items, scrims, token }, signal ) {

    const response = await apiCall( `/api/matchlist?items=${items}&scrims=${scrims}&token=${token}`,  signal );
    const resData = await response.json();

    resData.map( (match) => {
        match.date = formatMatchDate(match.date);
        return match;
    } )

    return resData;
}

export async function fetchNavBar( {token}, signal ) {
    
    const response = await apiCall(`/api/navBar?token=${token}`, signal)
    const resData = await response.json();


    return resData;
}

export async function fetchTeam( { teamName, players }, signal ) {
    
    const response = await apiCall(`${lolApi}/readTeam?teamName=${encodeURIComponent(teamName)}&playerSearch=${ encodeURIComponent( JSON.stringify( players ) ) }`, signal)

    const resData = await response.json();

    return resData;
}

export async function fetchPlayer( { name, tag }, signal ) {
    
    const response = await apiCall(`${lolApi}/readPlayer?gameName=${ encodeURIComponent( name ) }&tagLine=${ encodeURIComponent( tag ) }`, signal)
    const resData = await response.json();

    return resData;
}

export async function fetchRoleChamps( { role }, signal ) {
    
    const response = await apiCall(`${lolApi}/readChampionRoles?role=${ encodeURIComponent( role ) }`, signal)
    const resData = await response.json();

    return resData;
}

export async function fetchTeams({}, signal ) {
    
    const response = await fetch(`${lolApi}/readTeams`, signal)
    const resData = await response.json();

    return resData;
}

export async function fetchMatch({ matchId }, signal ) {
    
    const response = await apiCall(`${lolApi}/readMatch?matchId=${matchId}`, signal)
    const resData = await response.json();

    return resData;
}

export async function fetchMatches({ matchList, puuid }, signal ) {
    
    const response = await apiCall(`${lolApi}/readMatches?puuid=${puuid}&matchList=${ matchList.join(';') }`, signal)
    const resData = await response.json();

    return resData;
}

export async function fetchMatchesInMultiplePlayers( { teamName }, signal ) {
    
    const response = await apiCall(`${lolApi}/readMatchesInMultiplePlayers?teamName=${encodeURIComponent(teamName)}`, signal)
    const resData = await response.json();

    return resData;
}

