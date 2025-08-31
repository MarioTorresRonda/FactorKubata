'use client'

import Message from "@/components/fragments/Message"
import AddMatchTeam from "./AddMatchTeam"
import AddMatchGames from "./AddMatchGames"

export default function AddMatch() {
    return <div className="w-2/3 gap-3 bg-stone-200 py-2 dark:bg-stone-700 flex flex-col"> 
        <div className="flex flex-row justify-center">
            <p className={`text-3xl font-bold`}>
                <Message code={["home", "matches", "addMatch"]} />
            </p>
        </div>
        <div className="flex flex-row w-full">
            <AddMatchTeam side={1} />
            <AddMatchTeam side={2} />
        </div>
        <div className="w-full">
            <AddMatchGames />
        </div>
    </div>
}