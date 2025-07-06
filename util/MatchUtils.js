export const matchColors = {
    draw : "bg-stone-300",
    win: "bg-green-300",
    lose:  "bg-red-300"
}

export function matchColorByWins( leftTeamWins, rightTeamWins, leftTeamIsMain ) {

    if ( leftTeamWins == rightTeamWins ) {
        return matchColors.draw
    }
    if ( leftTeamWins > rightTeamWins ) {
        return leftTeamIsMain ? matchColors.win : matchColors.lose;
    }
    return leftTeamIsMain ? matchColors.lose : matchColors.win;
}

export function matchColorByValue( isWin ) {

    return isWin ? matchColors.win : matchColors.lose;
}
export const side = {
    blue: 100,
    red: 200
}