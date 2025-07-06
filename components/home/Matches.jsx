'use client'

import {Roboto_Condensed} from "next/font/google";

import Message from "@/components/fragments/Message";
import { useNavigate } from "@/hooks/useNavigate";
import Match from "../matches/Match";
import { fetchMatchList } from "@/http";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";
import { getCookie } from "@/util/cookies";

const font = Roboto_Condensed({subsets: ["latin"]});


export default function Matches() {
    
    const { navigate } = useNavigate();
    const [matchListBody, setMatchListBody] = useState( { items: 3, scrims : false, token : "" } )

	function onHandleSeeMore() {
		navigate( { url: "matches" } )
	}

    const {
        isFetching, 
        fetchedData : matchList,
        error,
        setFetchedData : setMatchList
    } = useFetch( fetchMatchList, matchListBody, [], [] );


    return (
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <p className={`text-[52px] font-bold  ${font.className} mt-14`}>
                <Message code={["home", "matches", "title"]} />
            </p>
            { matchList.slice( 0, 3).map((match) => {
                return <Match key={match.name} match={match} mainPanel={false} />
            })}
            <div className="h-12 py-2 px-6 flex justify-center items-center border-2 transition-all duration-300
            text-stone-900  mt-2 bg-stone-300 border-stone-500  hover:bg-stone-400
            dark:bg-stone-500 dark:text-stone-50 dark:border-stone-700 dark:hover:bg-stone-600"
                onClick={onHandleSeeMore}
            >
                <p>
                    Ver más...
                </p>
            </div>
        </div>
    )
}