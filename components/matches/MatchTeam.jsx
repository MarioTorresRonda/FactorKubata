import Image from "next/image";
import MatchTeamIcon from "./MatchTeamIcon";

export default function MatchTeam( {team} ) {
    return <>
        <div className="sm:block hidden"> { team.name } </div>
        <div className="h-16 w-min aspect-square">
            <MatchTeamIcon name={team.name} imgBase64={team.image} />
        </div>
    </>
}