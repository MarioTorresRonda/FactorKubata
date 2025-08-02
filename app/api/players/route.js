import { NextResponse } from "next/server";
import { matchList } from "@/data/matchList";
import { players } from "@/data/players";
import { badges } from "@/data/badges"; 

const fs = require('fs');

export async function GET(request) {

	const finalObj = {};
	const finalObjsScrims = {};
	const most = {...badges }

	players.forEach( player => {

		finalObj[player.name] = statsObj({ player, scrim : false});
		finalObjsScrims[player.name] = statsObj({ player, scrim : true});

		//Badges
		Object.keys(most).forEach( stat => {
		if ( !most[stat].value || most[stat].value < finalObj[player.name][most[stat].id] ) {
			most[stat].value = finalObj[player.name][most[stat].id];
			most[stat].name = player.name;
		}
		} )
	} );

	Object.keys( most ).forEach( ( statKey ) => {
		finalObj[ most[statKey].name ].badges.push( statKey )
	})
  
	fs.writeFileSync('./data/playerStats.js', `export const stats = ${ JSON.stringify( finalObj ) }` );
	fs.writeFileSync('./data/playerStatsScrims.js', `export const stats = ${ JSON.stringify( finalObjsScrims ) }` );

	return NextResponse.json( { message: `OK. filed updated` }, {status: 200});
}

function statsObj({ player, scrim }) {


	const playedGames = [];

	matchList.forEach((match) => {
		match.games.forEach( (game) => {
			if ( !scrim && game.scrim  ) {
				return;
			}

			var playedGame;
			if (game.info) {
				game.info.participants.forEach((participant) => {
					if (participant.PUUID == player.player.puuid && participant.TEAM_POSITION == player.role.roleId ) {
						playedGame = participant;
						playedGame.gameDuration = game.info.gameDuration;
					}
				});
				if ( playedGame ) {
					playedGames.push( playedGame );
				}
			}

		} )	
	});

  	//Totals
  	const kills = sumOf( playedGames, "CHAMPIONS_KILLED" );
	const deaths = sumOf( playedGames, "NUM_DEATHS" );
	const assists = sumOf( playedGames, "ASSISTS" );
  	const KDA = Math.round( ( kills + assists ) / ( deaths / 100 ) ) / 100;
	const totalDamage = sumOf( playedGames, "TOTAL_DAMAGE_DEALT_TO_CHAMPIONS" );
	const totalTaken = sumOf( playedGames, "TOTAL_DAMAGE_TAKEN" );
	const totalHeal = sumOf( playedGames, "TOTAL_HEAL" );
	const totalTowerDamage = sumOf( playedGames, "TOTAL_DAMAGE_DEALT_TO_TURRETS");
	const totalCast = sumOfMultiple( playedGames, ["SPELL1_CAST", "SPELL2_CAST", "SPELL3_CAST", "SPELL3_CAST"  ] );
	const pings = sumOfMultiple( playedGames, ["ALL_IN_PINGS", "ASSIST_ME_PINGS", "BAIT_PINGS", "BASIC_PINGS", "COMMAND_PINGS", "DANGER_PINGS", "ENEMY_MISSING_PINGS", "ENEMY_VISION_PINGS", "GET_BACK_PINGS", "HOLD_PINGS", "NEED_VISION_PINGS", "ON_MY_WAY_PINGS", "PUSH_PINGS", "RETREAT_PINGS" ] );

    //Betters

	let mostKills = 0;
	let mostDeaths = 9999;
	let mostAssists = 0;
  	let mostDamage = 0;
	let mostTaken = 0;
	let mostHeal = 0;
	let mostFarm = 0;
	let mostFarmMin = 0;
	let mostGold = 0;
	let mostWards = 0;
	let mostTowerDamage = 0;
	let playedChampsObj = {}
	let playedChamps = []
	let playedTotalGames = 0;

	playedGames.forEach((player) => {
		mostKills = mostKills < Number(player.CHAMPIONS_KILLED) ? Number(player.CHAMPIONS_KILLED) : mostKills;
		mostDeaths = mostDeaths > Number(player.NUM_DEATHS) ? Number(player.NUM_DEATHS) : mostDeaths;
		mostAssists = mostAssists < Number(player.ASSISTS) ? Number(player.ASSISTS) : mostAssists;
		mostDamage = mostDamage < Number(player.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS) ? Number(player.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS) : mostDamage;
		mostTaken = mostTaken < Number(player.TOTAL_DAMAGE_TAKEN) ? Number(player.TOTAL_DAMAGE_TAKEN) : mostTaken;
		mostHeal = mostHeal < Number(player.TOTAL_HEAL) ? Number(player.TOTAL_HEAL) : mostHeal;
		mostTowerDamage = mostTowerDamage < Number(player.TOTAL_DAMAGE_DEALT_TO_TURRETS) ? Number(player.TOTAL_DAMAGE_DEALT_TO_TURRETS) : mostTowerDamage;

		let minionsKilled = Number( player.MINIONS_KILLED ) + Number( player.NEUTRAL_MINIONS_KILLED );
		let minionsMin =  Math.round( minionsKilled / ( player.gameDuration / 6000000 ) ) / 100;

		mostFarm = mostFarm < minionsKilled ? minionsKilled : mostFarm;
		mostFarmMin = mostFarmMin < minionsMin ? minionsMin : mostFarmMin;
		mostGold = mostGold < Number(player.GOLD_EARNED) ? Number(player.GOLD_EARNED) : mostGold;
		mostWards = mostWards < Number(player.VISION_WARDS_BOUGHT_IN_GAME) ? Number(player.VISION_WARDS_BOUGHT_IN_GAME) : mostWards;
		

		if ( playedChampsObj[player.SKIN] ) {
			const times = playedChampsObj[player.SKIN].times;
			const wins = playedChampsObj[player.SKIN].wins;

			playedChampsObj[player.SKIN].times = times + 1;
			playedChampsObj[player.SKIN].wins = player.WIN == "Win" ? wins + 1 : wins;
		}else{
			playedChampsObj[player.SKIN] = { 
				times : 1,
				wins : player.WIN == "Win" ? 1 : 0 ,
			 };
		}
		playedTotalGames++;
	});

	Object.keys( playedChampsObj ).forEach(championName => {
		playedChamps.push( { 
			name: championName, 
			times : playedChampsObj[championName].times, 
			wins : playedChampsObj[championName].wins
		});
	});

	return {
		kills,
		deaths,
		assists,
		KDA,
        totalDamage,
        totalTaken,
        totalHeal,
		mostKills,
		mostDeaths,
		mostAssists,
        mostDamage,
        mostTaken,
        mostHeal,
		mostFarm,
		mostFarmMin,
		mostGold,
		mostTowerDamage,
		playedChamps,
		playedTotalGames,
		totalTowerDamage,
		totalCast,
		pings,
		mostWards,
    	badges: []
	};
}

function sumOfMultiple( array, propArray ) {

	let tempNumber = 0;
	propArray.forEach( prop => {
		tempNumber += array
		.map((elem) => elem[prop] )
		.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
	})
    return tempNumber;
}

function sumOf( array, prop ) {
    return array
    .map((elem) => elem[prop] )
    .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
}
