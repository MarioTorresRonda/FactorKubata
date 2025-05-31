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
        if ( leftTeamIsMain  ) {
            return matchColors.win
        }else{
            return matchColors.lose
        }
    }
    if ( leftTeamIsMain ) {
        return matchColors.lose
    }else{
        return matchColors.win
    }
}

export function matchColorByValue( isWin ) {

    return isWin ? matchColors.win : matchColors.lose;
}