
import yulPlayer from "@/public/Yul.png"
import jorgePlayer from "@/public/Jorge.png"
import marioPlayer from "@/public/Mario.png"
import moiPlayer from "@/public/Moi.png"
import hacterPlayer from "@/public/Hacter.png"


import { teams } from "./teams"
import { adc, jungle, mid, supp, top } from "./roles"


export const players = [ 
{
    name: "FK Archer",
    role: top,
    imgSrc : jorgePlayer,
    player: teams.factorKubata.players.top
},
{
    name: "FK Cabra",
    role: jungle,
    imgSrc : marioPlayer,
    player: teams.factorKubata.players.jungle
},
{
    name: "FK LvdiK",
    role: mid,
    imgSrc : yulPlayer,
    player: teams.factorKubata.players.mid
},
{
    name: "Bor Hacter",
    role: adc,
    imgSrc : hacterPlayer,
    player: teams.factorKubata.players.adc
},
{
    name: "FK Moi",
    role: supp,
    imgSrc : moiPlayer,
    player: teams.factorKubata.players.supp
},
];