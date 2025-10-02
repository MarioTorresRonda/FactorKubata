export function anonTeam( getText ) {
    return { 
        _id: -2,
        name: getText( ["home", "matches", "addMatchTeamSelectAnon"] ),
        players : anonPLayers
    }
}

const anonPLayers = [
    { name: "???", uuid: "-1", id: 0 },
    { name: "???", uuid: "-1", id: 1 },
    { name: "???", uuid: "-1", id: 2 },
    { name: "???", uuid: "-1", id: 3 },
    { name: "???", uuid: "-1", id: 4 },
]

export function newTeam() {
    return { 
        _id: -1,
        name: "",
        players : []
    }
}

export function getNewID( players ) {
    let newId;
    do{
        newId = Math.round(Math.random() * 10000);
    }while( players.filter( ( player ) => { player.id == newId } ).length == 1 );
    return newId;
}

