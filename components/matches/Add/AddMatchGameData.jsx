import { teamPlayers } from "@/util/matches";
import AddMatchGameDataPLayer from "./AddMatchGameDataPlayer";

export default function AddMatchGameData( { participants } ) {

    const { bluePlayers, redPlayers, result } = teamPlayers( participants );

    return <div className="w-full flex flex-row gap-2 px-4 py-3">
        <div className="w-1/2 flex flex-col gap-2">
            { bluePlayers.map( player => { return <AddMatchGameDataPLayer key={player.UUID} player={player} /> } ) }
        </div>
        <div className="w-1/2 flex flex-col gap-2">
            { redPlayers.map( player => { return <AddMatchGameDataPLayer key={player.UUID} player={player} /> } ) }
        </div>
    </div>
}