import { formatMatchDate, formatMatchDateInput } from "@/util/dates";
import { apiCall, lolApi, postBodyJSON } from "../fetchUtils";
import { fetchEspecialTeamsByName } from "./especialsTeams";

export async function fetchMatchList( { items, scrims, token }, signal ) {

    const resData = await apiCall( `${lolApi}/especialMatches/readAll?items=${items}&scrims=${scrims ? 1 : 0}&token=${token}`,  signal );

    for (let i = 0; i < resData.length; i++) {
        const match = resData[i];
        match.date = formatMatchDateInput(match.date);
        for (let j = 0; j < match.games.length; j++) {
            const game = match.games[j];
            game.blue = await fetchEspecialTeamsByName({ name : game.blue } )
            game.red = await fetchEspecialTeamsByName({ name : game.red } )
            
        }   
    }

    return resData;
}

export async function createEspecialMatch( { token, name, date, games }, body ) {
    const resData = await apiCall(`${lolApi}/especialMatches/create?token=${token}`, postBodyJSON( body, { name, date, games } ));
    return resData;
}