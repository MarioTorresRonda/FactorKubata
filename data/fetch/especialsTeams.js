import { apiCall, lolApi, postBodyJSON } from "../fetchUtils";

export async function fetchEspecialTeams( { token }, body ) {
    const resData = await apiCall(`${lolApi}/especialMatchesTeams/readAll?token=${token}`, body )
    return resData;
}

export async function createEspecialTeam( { token, teamName, players }, body ) {
    console.log( players )
    const resData = await apiCall(`${lolApi}/especialMatchesTeams/create?token=${token}`, postBodyJSON( body, { name: teamName, players } ));
    return resData;
}

