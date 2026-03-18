
import yulPlayer from "@/public/Yul.png"
import jorgePlayer from "@/public/Jorge.png"
import marioPlayer from "@/public/Mario.png"
import moiPlayer from "@/public/Moi.png"
import hacterPlayer from "@/public/Hacter.png"
import BubaPlayer from "@/public/Buba.png"
import MarcosPlayer from "@/public/Marcos.png"
import BorjaPlayer from "@/public/Borja.png"
import noImg from "@/public/NoImg.png"


import { teams } from "./teams"
import { adc, coach, jungle, mid, supp, top } from "./roles"


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
    name: "FK Bubazila",
    role: adc,
    imgSrc : BubaPlayer,
    player: teams.factorKubata.players.adcSub
},
{
    name: "FK Arcadic",
    role: supp,
    imgSrc : MarcosPlayer,
    player: teams.factorKubata.players.jungleSub
},
{
    name: "Bor Hacter",
    role: adc,
    imgSrc : hacterPlayer,
    old: true,
    player: teams.factorKubata.players.adc
},
{
    name: "FK Moi",
    role: coach,
    imgSrc : moiPlayer
},
{
    name: "FK Harver",
    role: coach,
    imgSrc : BorjaPlayer
},
{
    name: "FK Rulo",
    role: supp,
    imgSrc : noImg,
    old: true,
    player: teams.factorKubata.players.oldSupp
},
];