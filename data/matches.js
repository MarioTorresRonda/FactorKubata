import { formatMatchDate } from "@/util/dates";
import { teams } from "./teams";
import { Gnar, Ornn, Rakan, Syndra, Vayne, Volibear, MonkeyKing, Viktor, Xayah, Milio } from "./formattedChampions";

export const matches = [
    {
        date: formatMatchDate("23/02/2025 8:00PM GMT+1"),
        name: "23022025",
        win: false,
        result: "29-31",
        expandedView: {
            blue: {
                team: teams.diverbot,
                top: { champion : Gnar, score: "6/3/7" },
                jungle: { champion : Volibear, score: "10/8/8" },
                mid: { champion : Syndra, score: "6/7/9" },
                adc: { champion : Vayne, score: "6/7/6" },
                supp: { champion : Rakan, score: "1/6/17" },
            },
            red: {
                team: teams.factorKubata,
                top: { champion : Ornn, score: "5/4/10"  },
                jungle: { champion : MonkeyKing, score: "7/6/15"  },
                mid: { champion : Viktor, score: "6/6/14"  },
                adc: { champion : Xayah, score: "11/8/12"  },
                supp: { champion : Milio, score: "2/5/22"  },
            }
        }
    },
    {
        date: formatMatchDate("16/02/2025 8:00PM GMT+1"),
        name: "16022025",
        win: true,
        result: "31-14",
        expandedView: {
            blue : {
                team: teams.factorKubata,
                top: { champion : Ornn  },
                jungle: { champion : MonkeyKing  },
                mid: { champion : Viktor  },
                adc: { champion : Xayah  },
                supp: { champion : Milio  },
            },
            red : {
                team: teams.raimon,
                top: { champion : Gnar  },
                jungle: { champion : Volibear  },
                mid: { champion : Syndra  },
                adc: { champion : Vayne  },
                supp: { champion : Rakan  },
            },
        }
    },
    {
        date: formatMatchDate("09/02/2025 8:00PM GMT+1"),
        name: "09022025",
        win: false,
        result: "22-31",
        expandedView: {
            blue : {
                team: teams.skyfox,
                top: { champion : Gnar  },
                jungle: { champion : Volibear  },
                mid: { champion : Syndra  },
                adc: { champion : Vayne  },
                supp: { champion : Rakan  },
            },
            red : {
                team: teams.factorKubata,
                top: { champion : Ornn  },
                jungle: { champion : MonkeyKing  },
                mid: { champion : Viktor  },
                adc: { champion : Xayah  },
                supp: { champion : Milio  },
            },
        }
    }
]