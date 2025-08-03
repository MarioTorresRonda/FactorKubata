import Message from "../fragments/Message";
import ChampionImage from "../fragments/ChampionImage";

export default function RivalPlayerMatchesMultiple( { matches, puuid, matchesIMP } ) {

    const matchesFound = matches.filter( match => matchesIMP.indexOf( match.matchId ) != -1 );
    const matchesFoundObj =  {};
    matchesFound.map( ( match ) => {
        matchesFoundObj[match.matchId] = match;
    } )

    return <div className="flex flex-col gap-2">
        <p className="text-center w-full"> <Message code={["home", "scouting", "matches", "totalGames"]} /> ( { matchesFound.length } ) </p>
        <div className="flex gap-4 flex-col">
        { matchesIMP.map( ( matchId ) => {
            const matchFound = matchesFoundObj[ matchId ];
            if ( matchFound ) {
                const champId = matchFound.info.participants[0].championId;
                return <div className="flex flex-row" key={matchFound.matchId}> 
                    <div className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative">
                        <ChampionImage fill={true} championId={champId} />
                    </div>
                    <p> { matchId } </p>
                </div> 
            }
            
            return <div key={matchId} className="aspect-square w-[50px] max-w[50px] max-h-[50px] relative">
            </div>

        } ) }
        </div>
    </div>
}