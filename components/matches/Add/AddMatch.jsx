'use client'

import Message from "@/components/fragments/Message"
import AddMatchTeam from "./AddMatchTeam"
import AddMatchGames from "./AddMatchGames"
import { useState } from "react";
import { anonTeam } from "./AddMatchFunctions";
import { useMessageText } from "@/hooks/useMessageText";
import AddMatchSave from "./AddMatchSave";
import PrettyInput from "@/components/fragments/PrettyInput";

export default function AddMatch() {

    const getText = useMessageText();
    
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [ team1, setTeam1 ] = useState( anonTeam(getText) );
    const [ team2, setTeam2 ] = useState( anonTeam(getText) );
    const [games, setGames] = useState([]);
    const teamArray = [team1, team2];

    function OnHandleUpdateName(event) {
        const name = event.target.value;
        setName( name );
    }

    function OnHandleUpdateDate(event) {
        const date = event.target.value;
        setDate( date );
    }

    return <div className="w-full xl:w-2/3 bg-stone-200 py-2 dark:bg-stone-700 flex flex-col rounded-md"> 
        <div className="flex flex-row justify-center pb-2">
            <p className={`text-3xl font-bold`}>
                <Message code={["home", "matches", "addMatch"]} />
            </p>
        </div>
        <div className="flex flex-row w-full gap-4 items-center  px-6 py-3 bg-black/20">
            <div className="flex flex-row gap-1 items-center">
                <p className=""> <Message code={["home", "matches", "addMatchTeamName"]} /> </p>
                <PrettyInput className="w-60 rounded-md" value={name} onChange={OnHandleUpdateName} ></PrettyInput>
            </div>
            <div className="flex flex-row gap-1 items-center">
                <p className=""> <Message code={["home", "matches", "addMatchDate"]} /> </p>
                <PrettyInput type="date" className="w-60 rounded-md" value={date} onChange={OnHandleUpdateDate} ></PrettyInput>
            </div>
            <AddMatchSave name={name} date={date} games={games} teams={teamArray} />
        </div>
        <div className="flex flex-row w-full">
            <AddMatchTeam side={1} team={team1} setTeam={setTeam1} />
            <AddMatchTeam side={2} team={team2} setTeam={setTeam2} />
        </div>
        <div className="w-full">
            <AddMatchGames teams={teamArray} games={games} setGames={setGames} />
        </div>
    </div>
}