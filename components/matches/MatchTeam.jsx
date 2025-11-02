import Image from "next/image";
import MatchTeamIcon from "./MatchTeamIcon";
import { useMessageText } from "@/hooks/useMessageText";

export default function MatchTeam( {team} ) {

    const getText = useMessageText();
    if ( Array.isArray(team.name) ) {
        team.name = getText(team.name);
    }

    return <>
        <div className="sm:block hidden"> { team.name } </div>
        <div className="h-16 w-min aspect-square">
            <MatchTeamIcon name={team.name} imgBase64={team.image} />
        </div>
    </>
}