import Image from "next/image";
import FAI from "../fragments/FAI";


import { faFlag as scoreIcon } from "@fortawesome/free-regular-svg-icons"

export default function ExpandedView({expandedView}) {

    const bluePlayers = expandedView.blue.team.players;
    const blueRoles = expandedView.blue;
    const blueTeam = expandedView.blue.team;

    const redPlayers = expandedView.red.team.players;
    const redRoles = expandedView.red;
    const redTeam = expandedView.red.team;

	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-col flex-1">
                <div className="flex flex-row">
				    <p className="text-xl w-[16.75rem] font-semibold pl-4"> Lado Azul </p>
				    <p className="text-xl w-[6rem] font-semibold"> <FAI className="h-4 w-full" icon={scoreIcon}></FAI> </p>
                </div>
				{ Object.keys(bluePlayers).map((key) => {
					return (
						<div key={key} className="flex flex-row h-16 odd:bg-black/10 w-full gap-2 items-center pl-4">
                            <div className="h-12 w-12"> <Image src={ blueRoles[key].champion.image}></Image> </div>
							<p className="w-48"> { bluePlayers[key].name } </p>
                            <p className="w-4 text-center"> { blueRoles[key].score.substr(0, blueRoles[key].score.indexOf("/") ) } </p>
                            /
                            <p className="w-4 text-center"> { blueRoles[key].score.substr(blueRoles[key].score.indexOf("/") + 1, blueRoles[key].score.lastIndexOf("/") - ( blueRoles[key].score.indexOf("/") + 1 )) } </p>
                            /
                            <p className="w-4 text-center"> { blueRoles[key].score.substr(blueRoles[key].score.lastIndexOf("/") + 1 ) } </p>
						</div>
					);
				}) }
			</div>
            <div className="flex flex-col flex-1 text-right items-end">
                <div className="flex flex-row">
				    <p className="text-xl w-[6rem] font-semibold"> <FAI className="h-4 w-full" icon={scoreIcon}></FAI> </p>
				    <p className="text-xl w-[16.75rem] font-semibold pr-4"> Lado Azul </p>
                </div>
				{ Object.keys(redPlayers).map((key) => {
					return (
						<div key={key} className="flex flex-row h-16 odd:bg-black/10 w-full gap-2 items-center justify-end pr-4">
                            <p className="w-4 text-center"> { redRoles[key].score.substr(0, redRoles[key].score.indexOf("/") ) } </p>
                            /
                            <p className="w-4 text-center"> { redRoles[key].score.substr(redRoles[key].score.indexOf("/") + 1, redRoles[key].score.lastIndexOf("/") -  ( redRoles[key].score.indexOf("/") + 1)) } </p>
                            /
                            <p className="w-4 text-center"> { redRoles[key].score.substr(redRoles[key].score.lastIndexOf("/") + 1 ) } </p>
							<p className="w-48"> { redPlayers[key].name } </p>
                            <div className="h-12 w-12"> <Image src={ redRoles[key].champion.image}></Image> </div>
						</div>
					);
				}) }
            </div>
		</div>
	);
}
