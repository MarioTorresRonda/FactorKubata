import TeamPlayer from "@/components/team/TeamPlayer";
import { players } from "@/data/players";
import {Roboto_Condensed} from "next/font/google";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {
	return (
		<main className="mb-32 text-5xl w-full h-full flex align-middle justify-center mt-10">
			<div className="flex flex-col gap-6 w-full"> { players.map( (player) => {
				return <TeamPlayer key={player.name} player={player} />
			}) } </div>
		</main>
	);
}
