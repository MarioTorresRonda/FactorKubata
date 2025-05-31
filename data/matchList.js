import {teams} from "./teams";
import match25052025 from "@/data/matches/Division5 Split3 periodo1 Ronda 2 2025.json";
import match18052025 from "@/data/matches/Division5 Split3 periodo1 2025.json";
import match30032025 from "@/data/matches/Division5 Split2 periodo2 Ronda2 2025.json";
import match23032025 from "@/data/matches/Division5 Split2 periodo2 2025.json";
import match23022025 from "@/data/matches/23022025.json";
import match16022025 from "@/data/matches/16022025.json";
import cale4 from "@/data/matches/cale community 4 Stargaming.json";
import cale3 from "@/data/matches/cale community 3 IRK.json";
import cale2 from "@/data/matches/cale community 2 Team Solo Clowns.json";
import cale1 from "@/data/matches/cale communnity 1 diverbot papea.json";
import forgotten3 from "@/data/matches/forgotten 3 synchronyze.json";
import forgotten2 from "@/data/matches/forgotten 2 pandepueblo.json";
import forgotten1 from "@/data/matches/forgotten 1 remenants.json";

import scrim_14052025_1 from "@/data/matches/scrims/14052025 Scrim 1.json";
import scrim_14052025_2 from "@/data/matches/scrims/14052025 Scrim 2.json";
import scrim_18052025_1 from "@/data/matches/scrims/18052025 Scrim 1.json";
import scrim_18052025_2 from "@/data/matches/scrims/18052025 Scrim 2.json";
import scrim_18052025_3 from "@/data/matches/scrims/18052025 Scrim 3.json";
import scrim_21052025_1 from "@/data/matches/scrims/21052025 Scrim 1.json";
import scrim_21052025_2 from "@/data/matches/scrims/21052025 Scrim 2.json";

export const matchList = [
	{
		date: "08/06/2025 8:00PM GMT+1",
		name: "07062025",
		games: [
			{
				win: null,
				blue: teams.factorKubata,
			},
		],
	},
	{
		date: "25/05/2025 8:00PM GMT+1",
		name: "25052025",
		games: [
			{
				win: true,
				info: match25052025,
				blue: teams.nox,
				red: teams.factorKubata,
				POV: {
					JarvanIV: "https://youtu.be/RcLzeYx8UUA",
				},
			},
		],
	},
	{
		date: "21/05/2025 7:00PM GMT+1",
		games: [
			{
				win: true,
				info: scrim_21052025_1,
				blue: teams.factorKubata,
				scrim: true,
			},
			{
				win: false,
				info: scrim_21052025_2,
				red: teams.factorKubata,
				scrim: true,
			},
		],
	},
	{
		date: "18/05/2025 8:00PM GMT+1",
		name: "20052025",
		games: [
			{
				win: true,
				info: match18052025,
				blue: teams.masones,
				red: teams.factorKubata,
				POV: {
					Udyr: "https://youtu.be/28G59TUFqwI",
				},
			},
		],
	},
	{
		date: "18/05/2025 5:00PM GMT+1",
		games: [
			{
				win: false,
				info: scrim_18052025_1,
				red: teams.factorKubata,
				scrim: true,
			},
			
			{
				win: false,
				info: scrim_18052025_2,
				blue: teams.factorKubata,
				scrim: true,
			},
			{
				win: false,
				info: scrim_18052025_3,
				red: teams.factorKubata,
				scrim: true,
			},
		],
	},
	{
		date: "14/05/2025 8:00PM GMT+1",
		games: [
			{
				win: false,
				info: scrim_14052025_1,
				red: teams.factorKubata,
				scrim: true,
			},
			{
				win: false,
				info: scrim_14052025_2,
				blue: teams.factorKubata,
				scrim: true,
			},
		],
	},
	{
		date: "30/03/2025 8:00PM GMT+1",
		name: "30032025",
		games: [
			{
				win: false,
				info: match30032025,
				blue: teams.factorKubata,
				red: teams.RHT,
			},
		],
	},
	{
		date: "23/03/2025 8:00PM GMT+1",
		name: "23032025",
		games: [
			{
				win: false,
				info: match23032025,
				blue: teams.factorKubata,
				red: teams.RTG,
			},
		],
	},
	{
		date: "23/02/2025 8:00PM GMT+1",
		name: "23022025",
		games: [
			{
				win: false,
				info: match23022025,
				blue: teams.diverbot,
				red: teams.factorKubata,
				POV: {
					Ornn: "https://youtu.be/YjkFOsN3qj0",
					MonkeyKing: "https://youtu.be/cbLyeEFVHB0",
				},
			},
		],
	},
	{
		date: "16/02/2025 8:00PM GMT+1",
		name: "16022025",
		games: [
			{
				win: false,
				info: match16022025,
				blue: teams.raimon,
				red: teams.factorKubata,
				POV: {
					Ornn: "https://youtu.be/9aSYsE2FAds",
					JarvanIV: "https://youtu.be/3iM3BTIFfgA",
				},
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "09022025",
		games: [
			{
				win: false,
				info: null,
				blue: teams.skyfox,
				red: teams.factorKubata,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "cale community 4 Stargaming",
		games: [
			{
				win: false,
				info: cale4,
				blue: teams.factorKubata,
				red: teams.starGaming,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "cale community 3 IRK",
		games: [
			{
				win: false,
				info: cale3,
				blue: teams.factorKubata,
				red: teams.irk,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "cale community 2 Team Solo Clowns",
		games: [
			{
				win: false,
				info: cale2,
				blue: teams.factorKubata,
				red: teams.TSC,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "cale communnity 1 diverbot papea",
		games: [
			{
				win: false,
				info: cale1,
				blue: teams.factorKubata,
				red: teams.diverbot,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "forgotten 3 synchronyzed",
		games: [
			{
				win: false,
				info: forgotten3,
				blue: teams.Synchronyzed,
				red: teams.factorKubata,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "forgotten 2 pandepueblo",
		games: [
			{
				win: false,
				info: forgotten2,
				blue: teams.PDP,
				red: teams.factorKubata,
			},
		],
	},
	{
		date: "09/02/2025 8:00PM GMT+1",
		name: "forgotten 1 remenants",
		games: [
			{
				win: false,
				info: forgotten1,
				blue: teams.factorKubata,
				red: teams.RHT,
			},
		],
	},
];
