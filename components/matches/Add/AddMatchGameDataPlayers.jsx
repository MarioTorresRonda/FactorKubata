import AddMatchGameDataPLayer from "./AddMatchGameDataPlayer";
import PrettySelect from "@/components/fragments/PrettySelect";
import { useState } from "react";

const sides = {
    blue : "bg-blue-600/10",
    red : "bg-red-600/10"
}

export default function AddMatchGameDataPlayers( { game, setGame, side, players, teams } ) {

    function onHandleUpdateTeam(event) {
        setGame( game.id, event.target.value, side );
    }

    const team = teams.find( _t => _t.name == game[side] );

    return <div className={`w-full sm:w-1/2 flex flex-col ${sides[side]}`}>
        <PrettySelect className="w-40 rounded-md h-8" value={ game[side] } onChange={onHandleUpdateTeam}>
            { teams.map( ( _t ) => {
                return <option key={_t.name} value={_t.name}> {_t.name} </option> 
            } )  }
        </PrettySelect>
        { players.map( player => { return <AddMatchGameDataPLayer key={player.UUID} player={player} team={team} /> } ) }
    </div>
}