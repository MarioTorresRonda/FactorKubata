export const side = {
    blue: 100,
    red: 200
}

import { useMessageText } from "@/hooks/useMessageText";
import Image from "next/image";
import kubata from "@/public/teams/factorKubata.png";

export default function MatchSide( { className, teamSide, team } ) {

    const getText = useMessageText();


    return <div className={`${className} flex flex-row gap-2 justify-end items-center ${teamSide != side.blue ? "flex-row-reverse" : ""} `}>
        <div> { team ? team.name : getText(["home", "matches", "nullTeam"]) } </div>
        <div>
            { team && <Image height={48} width={48} src={team.icon} alt={team.name}></Image> }
            { !team && <Image height={48} width={48} src={kubata} alt={getText(["matches", "nullTeam"])}></Image> }
            
        </div>
    </div>
}