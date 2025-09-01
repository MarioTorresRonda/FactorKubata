import { teamPlayers } from "@/util/matches";
import AddMatchGameDataPLayer from "./AddMatchGameDataPlayer";

export default function AddMatchGameData( { participants } ) {

    const { bluePlayers, redPlayers, result } = teamPlayers( participants );

    return <div className="w-full flex flex-col sm:flex-row p-2">
        <div className="w-full sm:w-1/2 flex flex-col bg-blue-600/10">
            { bluePlayers.map( player => { return <AddMatchGameDataPLayer key={player.UUID} player={player} /> } ) }
        </div>
        <div className="w-full sm:w-1/2 flex flex-col bg-red-600/10">
            { redPlayers.map( player => { return <AddMatchGameDataPLayer key={player.UUID} player={player} /> } ) }
        </div>
    </div>
}