import { teams } from "@/data/teams";
import MatchTeam from "./MatchTeam";
import { side } from "@/util/MatchUtils";

export default function MatchSide( { className, teamSide, team } ) {
    return <div className={`${className} flex flex-row gap-2 justify-end items-center ${teamSide != side.blue ? "flex-row-reverse" : ""} `}>
        <MatchTeam team={team ? team : teams.secrets } />
    </div>
}