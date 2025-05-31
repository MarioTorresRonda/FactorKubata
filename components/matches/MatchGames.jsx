import { matchColorByValue } from "@/util/MatchUtils";
import ExpandedView from "./ExpandedView"

export default function MatchGames( { games } ) {

    if ( !games ) {
        return <p className="text-center mb-2 text-2xl"> Sin informacion de la partida. </p>
    }

    return <div>
        { games.map( (game, index) => {

            const bluePlayers = [], redPlayers = [];
            let result = "";

            game.info.participants.forEach(element => {
                if ( game.POV && game.POV[ element.SKIN ] ) {
                    element.POV = game.POV[ element.SKIN ];
                }
                if ( element.TEAM == "100" ) {
                    bluePlayers.push( element );
                }
                if ( element.TEAM == "200" ) {
                    redPlayers.push( element );
                }
            });
            result += bluePlayers.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
            result += "-";
            result += redPlayers.map( player => player.CHAMPIONS_KILLED ).reduce( (accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0 );
        
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