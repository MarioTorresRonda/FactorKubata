'use client'

import {Roboto_Condensed} from "next/font/google";

import Message from "@/components/fragments/Message";
import {matches} from "@/data/matches";
import Match from "@/components/home/Match";
import { useNavigate } from "@/hooks/useNavigate";

const font = Roboto_Condensed({subsets: ["latin"]});


export default function Matches() {
    
    const { navigate } = useNavigate();

	function onHandleSeeMore() {
		navigate( { url: "matches" } )
	}

    return (
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <p className={`text-[52px] font-bold  ${font.className} mt-14`}>
                <Message code={["home", "matches", "title"]} />
            </p>
            {matches.map((match) => {
                return <Match key={match.expandedView.name} match={match} />
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