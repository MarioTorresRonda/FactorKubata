import { formatMatchDate } from "./util/dates";

export async function fetchMatchList() {
    const response = await fetch('api/matchlist')
    const resData = await response.json();

    if ( !response.ok ) {
        throw new Error('Failed to fetch matchList');
    }

    resData.map( (match) => {
        match.date = formatMatchDate(match.date);
        return match;
    } )

    return resData;
}