import { apiCall, lolApi } from "../fetchUtils";

export async function fetchTeam( { token, teamName }, signal ) {
    const resData = await apiCall(`${lolApi}/Team/read?token=${token}&teamName=${encodeURIComponent(teamName)}`, signal);
    return resData;
}

export async function createTeam( { token, teamName, players }, signal ) {
    const resData = await apiCall(`${lolApi}/Team/create?token=${token}&teamName=${encodeURIComponent(teamName)}&playerSearch=${ encodeURIComponent( JSON.stringify( players ) ) }`, signal);
    return resData;
}

export async function deleteTeam( { token, teamName }, signal ) {
    const resData = await apiCall(`${lolApi}/Team/delete?token=${token}&teamName=${encodeURIComponent(teamName)}`, signal);
    return resData.updated.acknowledged;
}

export async function fetchTeams({ token }, signal ) {
    const resData = await apiCall(`${lolApi}/Team/readAll?token=${token}`, signal)
    return resData;
}