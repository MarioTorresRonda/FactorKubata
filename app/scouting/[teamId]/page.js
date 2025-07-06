'use client'

import Message from "@/components/fragments/Message";
import SliderCheck from "@/components/fragments/SliderCheck";
import RivalTeam from "@/components/scouting/RivalTeam";
import { useFetch } from "@/hooks/useFetch";
import { fetchTeam } from "@/http";
import { useState } from "react";

export default function Page( { params } ) {

    const { teamId } = params;
    const [teamsBody, setTeamsBody] = useState({ teamName: teamId, players: null });
    const [onlyRole, setOnlyRole] = useState(true);

    const {
        isFetching, 
        fetchedData : team,
        error,
        setFetchedData : setMatchList
    } = useFetch( fetchTeam, teamsBody, null, [] );

    function onHandleRoleClick() {
        setOnlyRole( !onlyRole )
    }

    return <div className="flex flex-row w-full justify-center py-4">
        <div className="flex flex-col w-full gap-4 items-center">
            <div className="mx-8 xl:mx-20 flex flex-row justify-left justify-between w-2/3">
                <p className="text-[70px] font-bold flex-1"> { decodeURIComponent(teamId) } </p>
                <div className="flex flex-row items-center">
                    <SliderCheck onClick={onHandleRoleClick} value={onlyRole} className="h-6 w-12" />
                    <Message code={["home", "scouting", "mastery", "onlyRole"]} />
                </div>
            </div>
            { ( !team && !error ) && <div> Loading... </div> }
            { ( !team && error ) && <div className="bg-red-300 dark:bg-red-700 py-2 px-2 text-center"> { error.message } </div> }
            { team && <RivalTeam team={team} onlyRole={onlyRole} /> }
        </div>
    </div>
}