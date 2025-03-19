import Message from "@/components/fragments/Message";
import Match from "@/components/matches/match";
import { matches } from "@/data/matchList";
import {Roboto_Condensed} from "next/font/google";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {
	return (
		<main className="mb-32">
			<div className="flex flex-col w-full justify-center items-center gap-4">
				<p className={`text-[52px] font-bold  ${font.className}`}>
					<Message code={["home", "matches", "title"]} />
				</p>
				{matches.map((match) => {
					return <Match key={match.name} match={match} mainPanel={true} />
				})}
			</div>
		</main>
	);
}
