import Message from "../fragments/Message";
import ChampionImage from "../fragments/ChampionImage";

export default function RivalPlayerMatchesLastChamps( { matches, role, onlyRole } ) {

    const loadedRoleChamps = matches.filter( match => { 
        if ( !onlyRole ) {
            return true;
        }
        return ( match.info.participants[0].teamPosition == role );
    } )

    let sortedMatches = loadedRoleChamps.sort( sortMatches ) 
    const last5Matches = sortedMatches.slice(0, 5);
    let champPlayed = last5Matches.map( match =>  { 
        return { 
            matchId : match.matchId,
            championId : match.info.participants[0].championId,
            kills : match.info.participants[0].kills,
            assists: match.info.participants[0].assists,
            deaths : match.info.participants[0].deaths,
        } 
    } )  ;

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "lastGames"]} /> </p>
        <div className="flex gap-3 flex-wrap h-[58px] overflow-y-scroll justify-center ">
        { champPlayed.map( ( { matchId, championId, kills, deaths, assists } ) => {
            return <div key={matchId} className="aspect-square w-[40px] max-w[40px] max-h-[40px] relative">
                <ChampionImage fill={true} championId={championId} />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-stone-900/50 text-white dark:bg-stone-900/70 text-center pt-5 font-bold text-lg">
                   { Math.round( (kills + assists) / deaths * 10) / 10 }
                </div>
            </div>
        } ) }
        </div>
    </div>
}

function sortMatches( a, b ) {

    const nameA = a.matchId.substr(5);
    const nameB = b.matchId.substr(5);

    if (nameA < nameB) {
        return 1;
    }
    if (nameA > nameB) {
        return -1;
    }

    // names must be equal
    return 0;
}