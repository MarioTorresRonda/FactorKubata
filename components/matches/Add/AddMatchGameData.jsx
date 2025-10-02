import { teamPlayers } from "@/util/matches";
import AddMatchGameDataPLayer from "./AddMatchGameDataPlayer";
import AddMatchGameDataPlayers from "./AddMatchGameDataPlayers";

export default function AddMatchGameData( { game, setGame, participants, teams } ) {

    const { bluePlayers, redPlayers, result } = teamPlayers( participants );

    return <div className="w-full flex flex-col sm:flex-row p-2">
        <AddMatchGameDataPlayers game={game} setGame={setGame} side="blue" players={bluePlayers} teams={teams} />
        <AddMatchGameDataPlayers game={game} setGame={setGame} side="red" players={redPlayers} teams={teams} />
    </div>
}