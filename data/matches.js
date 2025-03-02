import {formatMatchDate} from "@/util/dates";
import {teams} from "./teams";
import match2302205 from "@/data/matches/23022025.json"
import match1602205 from "@/data/matches/16022025.json"

export const matches = [
	{
		date: formatMatchDate("23/02/2025 8:00PM GMT+1"),
		name: "23022025",
		win: false,
		info : match2302205,
		blue: teams.diverbot,
		red: teams.factorKubata,
	},
	{
		date: formatMatchDate("16/02/2025 8:00PM GMT+1"),
		name: "16022025",
		win: true,
		info: match1602205,
		blue: teams.raimon,
		red: teams.factorKubata,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "09022025",
		win: false,
		result: "22-31",
		blue: teams.skyfox,
		red: teams.factorKubata
	},
];
