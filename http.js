import { formatMatchDate } from "./util/dates";
import { revalidatePath } from 'next/cache'

const lolApi = `/api/LoL`;

async function apiCall( url, signal ) {
    const response = await fetch( url, signal);
    
    if ( !response.ok ) {
        let error = new Error('Failed server call');; 

        try {
            const resData = await response.json();
            console.log( resData );
            if ( resData.message ) {
                error = new Error( resData.message );
            }
        } catch (error) { }

        throw error;
    }

    return await response.json();
}

export async function fetchChampionList( body, signal ) {
    const resData = await apiCall( "/api/LoLData/champions" , signal);
    return resData;
}

export async function fetchItemsList( body, signal ) {
    const resData = await apiCall( "/api/LoLData/items" , signal);
    return resData;
}

export async function fetchMatchList( { items, scrims, token }, signal ) {

    const resData = await apiCall( `${lolApi}/especialMatches?items=${items}&scrims=${scrims}&token=${token}`,  signal );

    resData.map( (match) => {
        match.date = formatMatchDate(match.date);
        return match;
    } )

    return resData;
}

export async function fetchNavBar( { token }, signal ) {
    
    const resData = await apiCall(`/api/navBar?token=${token}`, signal);

    return resData;
}

export async function fetchPlayer( { name, tag }, signal ) {
    
    const resData = await apiCall(`${lolApi}/readPlayer?gameName=${ encodeURIComponent( name ) }&tagLine=${ encodeURIComponent( tag ) }`, signal)

    return resData.player;
}

export async function fetchRoleChamps( { role }, signal ) {
    
    const resData = await apiCall(`${lolApi}/readChampionRoles?role=${ encodeURIComponent( role ) }`, signal)

    return resData;
}

export async function fetchMatch({ matchId }, signal ) {
    
    const resData = await apiCall(`${lolApi}/readMatch?matchId=${matchId}`, signal)

    return resData;
}

export async function fetchMatches({ matchList, puuid }, signal ) {
    
    const resData = await apiCall(`${lolApi}/readMatches?puuid=${puuid}&matchList=${ matchList.join(';') }`, signal)

    return resData;
}

export async function fetchMatchesInMultiplePlayers( { teamName }, signal ) {
    
    const resData = await apiCall(`${lolApi}/readMatchesInMultiplePlayers?teamName=${encodeURIComponent(teamName)}`, signal)

    return resData;
}

