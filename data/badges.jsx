import { faCalculator, faDroplet, faShield, faFlag, faMultiply, faPlus, faTowerCell } from "@fortawesome/free-solid-svg-icons";

export const badges = {
    kills : { id: "mostKills", icon: faDroplet, color: "bg-red-600" },
    damage : { id: "mostDamage", icon: faDroplet, color: "bg-red-700" },
    tanked : { id: "mostTaken", icon: faShield, color: "bg-stone-600" },
    towerDamage : { id: "mostTowerDamage", icon: faTowerCell, color: "bg-stone-500" },
    kda : { id: "KDA", icon: faCalculator, color: "bg-blue-600" },
    games : { id: "playedTotalGames", icon: faMultiply, color: "bg-blue-500" },
    assists : { id: "mostAssists", icon: faFlag, color: "bg-green-600" },
    heal : { id: "mostHeal", icon: faPlus, color: "bg-green-500" },
}