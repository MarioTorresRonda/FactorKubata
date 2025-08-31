import { matchColorByValue } from "@/util/MatchUtils";
import ExpandedView from "./ExpandedView"
import { teamPlayers } from "@/util/matches";

export default function MatchGames( { games } ) {

    if ( !games ) {
        return <p className="text-center mb-2 text-2xl"> Sin informacion de la partida. </p>
    }

    return <div>
        { games.map( (game, index) => {

            const { bluePlayers, redPlayers, result } = teamPlayers( game.info.participants );
            const blueSide = { team: game.blue, players: bluePlayers };
            const redSide ={ team: game.red, players: redPlayers };

            const backgroundColor = matchColorByValue( game.win );

            return ( 
                <div key={index} className={`flex flex-col ${backgroundColor} `}>
                    <p className="text-center w-full"> {result} </p>
                    <ExpandedView  blue={blueSide} red={redSide} />
                </div>
            ) 
            
        } ) }
    </div>

}