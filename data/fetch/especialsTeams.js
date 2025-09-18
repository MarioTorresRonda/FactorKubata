import { apiCall, lolApi, postBodyJSON } from "../fetchUtils";

export async function fetchEspecialTeams( { token }, body ) {
    const resData = await apiCall(`${lolApi}/especialMatchesTeams/readAll?token=${token}`, body )
    return resData;
}

export async function createEspecialTeam( { token, teamName, players, image }, body ) {
    console.log( players )
    const resData = await apiCall(`${lolApi}/especialMatchesTeams/create?token=${token}`, postBodyJSON( body, { name: teamName, players, image } ));
    return resData;
}

export async function deleteEspecialTeam( { token, teamName }, body ) {
    const resData = await apiCall(`${lolApi}/especialMatchesTeams/delete?token=${token}`, postBodyJSON( body, { name: teamName } ));
    console.log( resData );
    return resData;
}
