function rankColor( tier ) {
    if ( tier == "BRONZE" ) {
        return "bg-orange-400/50"
    }
    if ( tier == "SILVER" ) {
        return "bg-stone-400/50"
    }
    if ( tier == "GOLD" ) {
        return "bg-yellow-400/50"
    }
    if ( tier == "PLATINUM" ) {
        return "bg-slate-700/50"
    }
    if ( tier == "EMERALD" ) {
        return "bg-green-400/50"
    }
    if ( tier == "DIAMOND" ) {
        return "bg-blue-400/50"
    }
    if ( tier == "MASTER" ) {
        return "bg-purple-400/50"
    }
}

export default function RivalPlayerRanked( {ranked} ) {
    return <div className={`flex flex-col ${rankColor( ranked.tier )} p-2 mx-2`}>
        <div className="flex flex-row justify-between">
            <p> { ranked.queueType == "RANKED_FLEX_SR" ? "Flex" : "SoloQ" } </p>
            <p> {ranked.wins} / {ranked.losses} <span className="opacity-70"> { Math.round( ( 100 / ( ranked.wins + ranked.losses ) ) * ranked.wins ) }% </span> </p>
        </div>
        <p> {ranked.tier} {ranked.rank} </p>
    </div>
}