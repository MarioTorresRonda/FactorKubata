import { useFetch } from "@/hooks/useFetch";
import { fetchPlayer } from "@/http";
import { useEffect, useState } from "react";
import RivalPlayerRanked from "./RivalPlayerRanked";
import RivalPlayerMasteries from "./RivalPlayerMasteries";
import Image from "next/image";
import { rolesObj } from "@/data/roles";
import RivalPlayerMatches from "./RivalPlayerMatches";

export default function RivalPlayer( { player, onlyRole, onLoad, matchesIMP } ) {
    const {
        isFetching, 
        fetchedData : playerData,
        error,
        setFetchedData : setMatchList
    } = useFetch( fetchPlayer, player, null, [] );

    useEffect(() => {
      if ( playerData ) {
        onLoad()
      };
    }, [playerData, onLoad])

    return <div className="min-w-[250px] w-[calc(20%-1rem)] max-w-[320px] flex flex-col gap-4" >
        <div className="flex flex-row justify-between mx-2">
            <div className="text-xl font-bold"> { player.name } <span className="opacity-50 text-base"> #{ player.tag } </span> </div>
            <div> <Image src={ rolesObj[player.role].icon  } alt={player.role}></Image> </div>
        </div>
        { isFetching && <div> Loading... </div> }
        { !isFetching && error && <div> {error.message} </div> }
        { playerData && <div className="flex flex-col gap-2">
            <RivalPlayerRanked ranked={playerData.soloQ} />
            <RivalPlayerRanked ranked={playerData.flexQ} />
            <RivalPlayerMasteries masteries={playerData.masteries} player={player} onlyRole={onlyRole} />
            <RivalPlayerMatches matches={playerData.matches} player={player} puuid={playerData.puuid} onlyRole={onlyRole} matchesIMP={matchesIMP} />
        </div> }
    </div>
}