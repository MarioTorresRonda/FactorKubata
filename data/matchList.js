import {formatMatchDate} from "@/util/dates";
import {teams} from "./teams";
import match3003205 from "@/data/matches/Division5 Split2 periodo2 Ronda2 2025.json"
import match2303205 from "@/data/matches/Division5 Split2 periodo2 2025.json"
import match2302205 from "@/data/matches/23022025.json"
import match1602205 from "@/data/matches/16022025.json"
import cale4 from "@/data/matches/cale community 4 Stargaming.json"
import cale3 from "@/data/matches/cale community 3 IRK.json"
import cale2 from "@/data/matches/cale community 2 Team Solo Clowns.json"
import cale1 from "@/data/matches/cale communnity 1 diverbot papea.json"
import forgotten3 from "@/data/matches/forgotten 3 synchronyze.json"
import forgotten2 from "@/data/matches/forgotten 2 pandepueblo.json"
import forgotten1 from "@/data/matches/forgotten 1 remenants.json"

export const matchList = [
	{
		date: formatMatchDate("23/03/2025 8:00PM GMT+1"),
		name: "30032025",
		win: false,
		info: match3003205,
		blue: teams.factorKubata,
		red: teams.RHT,
	},
	{
		date: formatMatchDate("23/03/2025 8:00PM GMT+1"),
		name: "23032025",
		win: false,
		info: match2303205,
		blue: teams.factorKubata,
		red: teams.RTG,
	},
	{
		date: formatMatchDate("23/02/2025 8:00PM GMT+1"),
		name: "23022025",
		win: false,
		info : match2302205,
		blue: teams.diverbot,
		red: teams.factorKubata,
		POV: {
			Ornn: "https://youtu.be/YjkFOsN3qj0",
			MonkeyKing: "https://youtu.be/cbLyeEFVHB0"
		}
	},
	{
		date: formatMatchDate("16/02/2025 8:00PM GMT+1"),
		name: "16022025",
		win: true,
		info: match1602205,
		blue: teams.raimon,
		red: teams.factorKubata,
		POV: {
			Ornn: "https://youtu.be/9aSYsE2FAds",
			JarvanIV: "https://youtu.be/3iM3BTIFfgA"
		}
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "09022025",
		win: false,
		info: null,
		blue: teams.skyfox,
		red: teams.factorKubata
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "cale community 4 Stargaming",
		win: false,
		info: cale4,
		blue: teams.factorKubata,
		red: teams.starGaming,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "cale community 3 IRK",
		win: false,
		info: cale3,
		blue: teams.factorKubata,
		red: teams.irk,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "cale community 2 Team Solo Clowns",
		win: false,
		info: cale2,
		blue: teams.factorKubata,
		red: teams.TSC,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "cale communnity 1 diverbot papea",
		win: false,
		info: cale1,
		blue: teams.factorKubata,
		red: teams.diverbot,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "forgotten 3 synchronyzed",
		win: false,
		info: forgotten3,
		blue: teams.Synchronyzed,
		red: teams.factorKubata,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "forgotten 2 pandepueblo",
		win: false,
		info: forgotten2,
		blue: teams.PDP,
		red: teams.factorKubata,
	},
	{
		date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
		name: "forgotten 1 remenants",
		win: false,
		info: forgotten1,
		blue: teams.factorKubata,
		red: teams.RHT,
	},
];
