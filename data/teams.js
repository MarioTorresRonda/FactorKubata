import diverbot from "@/public/teams/Diverbot Papea.jpeg";
import kubata from "@/public/teams/factorKubata.png";
import skyfox from "@/public/teams/OGS Skyfox.png";
import raimon from "@/public/teams/Raimon.png";

export const teams = {
    factorKubata : {
        name: "Factor Kubata",
        icon: kubata,
        players: {
            top : { name : "FK Archer" },
            jungle : { name : "FK Cabra" },
            mid : { name : "FK LvdiK" },
            adc : { name : "Bor Hacter" },
            supp : { name : "FK Moi" }
        }
    },
    diverbot : {
        name: "Diverbot Papea",
        icon: diverbot,
        players: {
            top : { name : "Nino Nakano R34" },
            jungle : { name : "Segis" },
            mid : { name : "HugoSexy" },
            adc : { name : "DaNpRoAso" },
            supp : { name : "Marse" },
        }
    },
    raimon : {
        name: "Raimon",
        icon: raimon,        
        players: {
            top : { name : "NobitaElceros" },
            jungle : { name : "saanteez" },
            mid : { name : "Chuses" },
            adc : { name : "EasyLove" },
            supp : { name : "doraymonn" },
        }
    },
    skyfox : {
        name: "OGS Skyfox",
        icon: skyfox,        
        players: {
            top : { name : "FOX Loloky" },
            jungle : { name : "padeco" },
            mid : { name : "FOX Panita" },
            adc : { name : "DJ FUMAD0TE" },
            supp : { name : "Kottl1n" },
        }
    }
}