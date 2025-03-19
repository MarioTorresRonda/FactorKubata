
import yulPlayer from "@/public/Yul.png"
import jorgePlayer from "@/public/Jorge.png"
import marioPlayer from "@/public/Mario.png"
import noImg from "@/public/NoImg.png"

import top from "@/public/roles/Top_icon.webp"
import jungle from "@/public/roles/Jungle_icon.webp"
import mid from "@/public/roles/Middle_icon.webp"
import bottom from "@/public/roles/Bottom_icon.webp"
import support from "@/public/roles/Support_icon.webp"
import { teams } from "./teams"


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
    role: bottom,
    imgSrc : noImg,
    player: teams.factorKubata.players.adc
},
{
    name: "FK Moi",
    role: support,
    imgSrc : noImg,
    player: teams.factorKubata.players.supp
},
];