import Image from "next/image";

export default function MatchTeam( {team} ) {
    return <>
        <div className="sm:block hidden"> { team.name } </div>
        <div >
            <Image className="rounded-md" height={48} width={48} src={team.icon} alt={team.name}></Image>
        </div>
    </>
}