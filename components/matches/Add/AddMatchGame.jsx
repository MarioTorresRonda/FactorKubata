import Message from "@/components/fragments/Message";
import PrettyInput from "@/components/fragments/PrettyInput";
import { useCallback, useEffect, useState } from "react";
import AddMatchGameData from "./AddMatchGameData";
import { useMessageText } from "@/hooks/useMessageText";
import FAI from "@/components/fragments/FAI";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SliderCheck, { SliderColors } from "@/components/fragments/SliderCheck";

export default function AddMatchGame( { game, setGame, removeGame, teams } ) {

    const getText = useMessageText();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameData, setGameData] = useState(null);

    useEffect( () => {
        let validation;
        
        if ( game.file ) {
            try{

                const fileJSON = JSON.parse( game.file );
                if ( !fileJSON.matchId ) {
                    validation = `${getText(["home", "matches", "badFormatGame"])}: not matchId found` ;
                }else if ( !fileJSON.participants ) {
                    validation =`${getText(["home", "matches", "badFormatGame"])}: not participants found`;
                }else if ( !fileJSON.gameVersion ) {
                    validation = `${getText(["home", "matches", "badFormatGame"])}: not gameVersion found`;
                }
                
                if ( !error ) {
                    setGameData( fileJSON.participants );
                    setIsLoading( false );
                    setError( false );
                }

            }catch(ex) {
                validation = `${getText(["home", "matches", "badFormatGame"])}: ${ex.message}`;
            }        
            
            setError( validation );   
            setIsLoading(false);
        }
    }, [error, game.file ] );

    function onFileChange(event) {
        setIsLoading( true );
        setGame( game.id, event.target.value, "file" )
    }

    function onWinChange(event) {
        setGame( game.id, !game.win, "win" )
    }

    return <div className="flex flex-col w-full">
        <div className="flex flex-col pr-2">
            <p className="pl-2 ml-2"> <Message code={["home", "matches", "addMatchAddGameFile"]} />:  </p>
            <div className="flex flex-row gap-2">
                <PrettyInput className="w-full rounded-md" value={game.file} onChange={onFileChange} ></PrettyInput>
                <button 
                    className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
                    onClick={() => { removeGame(game.id) }}>
                    <FAI className="h-4 w-4" icon={faTrashAlt} />
                </button> 
            </div>
            <div className="flex flex-row gap-1 items-center ml-3">
                <p className="pl-2"> <Message code={["home", "matches", "addMatchGamesWin"]} />:  </p>
                <SliderCheck 
                    onClick={onWinChange} 
                    value={game.win} 
                    className="h-6 w-12" 
                    sliderColor={SliderColors.sliderColor.dark} 
                    activeColor={SliderColors.activeColor.win}
                    dotColor={SliderColors.dotColor.lose} 
                />
            </div>
        </div>
        <div className="flex flex-row w-full">
            { game.file && isLoading && <p> ...Loading </p> }
            { error && <p> {error} </p> }
            { !isLoading && !error && gameData && <AddMatchGameData game={game} setGame={setGame} participants={gameData} teams={teams} /> }
        </div>
    </div>
}