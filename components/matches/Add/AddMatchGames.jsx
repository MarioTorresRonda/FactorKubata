import FAI from "@/components/fragments/FAI";
import Message from "@/components/fragments/Message";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddMatchGame from "./AddMatchGame";

export default function AddMatchGames( { games, setGames, teams } ) {


    function getNewID() {
        let newId;
        do{
            newId = Math.round(Math.random() * 10000);
        }while( games.filter( ( game ) => { game.id == newId } ).length == 1 );
        return newId;
    }

    function addNewGame() {
        if ( games.length > 10 ) {
            toast( getText(["home", "matches", "maxLimitGames"]), { type:"error", theme:"colored" } );
        }else{
            setGames( oldGames => {
                const newGames = [...oldGames];
                newGames.push( { file: "", id: getNewID()  } );
                return newGames;
            } )
        }
    }

    function removeGame(id) {
        setGames( oldGames => {
            const newGames = [...oldGames];
            newGames.splice( newGames.findIndex( (game) => { return game.id == id} ), 1 );
            return newGames;
        } )
    }

    function setGame( id, newValue, field ) {
        setGames( oldGames => {
            const newGames = [...oldGames];
            const game = newGames.filter( ( game ) => { return game.id == id } )[0];
            game[field] = newValue;
            return newGames;
        } )
    }

    return <div className="flex flex-col bg-stone-600 py-2"> 
        <div className="flex flex-row w-full gap-4 items-center">
            <p className="text-2xl px-4" > <Message code={["home", "matches", "addMatchGames"]} /> </p>    
            <button 
                className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
                onClick={addNewGame}>
                <FAI className="h-4 w-4" icon={faPlus} />
                <Message code={["home", "matches", "addMatchAddGame"]} /> 
            </button> 
        </div>     
        <div className="flex flex-col">
            { games.map( (game) => {
                return <AddMatchGame key={game.id} game={game} setGame={setGame} removeGame={removeGame} teams={teams} />
            } )  }
        </div>
    </div>
}