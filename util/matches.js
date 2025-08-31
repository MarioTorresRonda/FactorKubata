const blueTeamCode = 100;
const redTeamCode = 200;

export function teamPlayers( participants ) {

    const bluePlayers = [], redPlayers = [];
    let result = "";

    participants.forEach(element => {
        if ( element.TEAM == blueTeamCode ) {
            bluePlayers.push( element );
        }
        if ( element.TEAM == redTeamCode ) {
            redPlayers.push( element );
        }
    });
    result += bluePlayers.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
    result += "-";
    result += redPlayers.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );

    return { bluePlayers, redPlayers, result };

}