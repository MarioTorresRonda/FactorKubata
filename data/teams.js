import diverbot from "@/public/teams/Diverbot Papea.jpeg";
import kubata from "@/public/teams/factorKubata.png";
import skyfox from "@/public/teams/OGS Skyfox.png";
import raimon from "@/public/teams/Raimon.png";

export const teams = {
    factorKubata : {
        name: "Factor Kubata",
        icon: kubata,
        players: {
            top : { name : "FK Archer", puuid: "5d886787-f60e-517f-826b-0ef5b42b35a9"  },
            jungle : { name : "FK Cabra", puuid: "30819fe3-5431-5fa8-a998-2a77b5313948" },
            mid : { name : "FK LvdiK", puuid: "e1b3b9c6-8aca-5d1c-a67d-19751b6f377f" },
            adc : { name : "Bor Hacter", puuid: "342f6cda-c141-5546-aa20-e708f6e61707" },
            supp : { name : "FK Moi", puuid: "c0351b6b-bcd8-5209-8575-e74995dd0a99" }
        }
    },
    diverbot : {
        name: "Diverbot Papea",
        icon: diverbot,
        players: {
            top : { name : "Nino Nakano R34", puuid: "9f886c17-98ee-5aad-9503-5515486edf64" },
            jungle : { name : "Segis", puuid: "ca6ff6ee-d101-5e6e-a5b8-50a6af1d8662" },
            mid : { name : "HugoSexy", puuid: "6d35eaba-1c75-570f-b74a-fd46ff5dfe3b" },
            adc : { name : "DaNpRoAso", puuid: "8aac087c-aa4a-5b63-b0e0-1f8572e24100" },
            supp : { name : "Marse", puuid: "dfe47d97-c3a1-50d9-bb78-21170544ad24" },
        }
    },
    raimon : {
        name: "Raimon",
        icon: raimon,        
        players: {
            top : { name : "NobitaElceros", puuid: "7e7db363-86f6-5b45-89f5-3f673a4f0978" },
            jungle : { name : "saanteez", puuid: "86b4565d-1feb-5828-a0bd-2323e60e10ea" },
            mid : { name : "Chuses", puuid: "41987718-bf9e-506e-ac44-e2295073dde6"  },
            adc : { name : "EasyLove", puuid: "2dc61e62-7ce7-5cf5-bc2e-a037aa42c935" },
            supp : { name : "doraymonn", puuid: "adbaaf1a-e6de-5b06-9155-ffe4db812178" },
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