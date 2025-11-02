import { apiCall, lolApi } from "../fetchUtils";

export async function fetchPlayersResume( { scrims }, signal ) {
    const resData = await apiCall(`${lolApi}/playersResume/read?scrim=${scrims ? 1 : 0}`, signal);
    return resData;
}

export async function createPlayersResume( {  }, signal ) {
    const resData = await apiCall(`${lolApi}/playersResume/create`, signal);
    return resData;
}
