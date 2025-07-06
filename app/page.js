import {Roboto_Condensed} from "next/font/google";

import Image from "next/image";
import homeImage from "@/public/FrontImage.jpg";
import Player from "@/components/home/Player";
import {players} from "@/data/players";
import Message from "@/components/fragments/Message";
import HorizontalBar from "@/components/fragments/HorizontalBar";
import {goalList} from "@/data/goals";
import GoalTrophy from "@/components/home/GoalTrophy";
import Matches from "@/components/home/Matches";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {
	return (
		<main className="mb-32">
			<div className={`flex flex-row justify-center z-0 -mt-4 h-[300px] md:h-[700px] overflow-hidden animate-fromTop relative text-white ${font.className}`}>
				<Image src={homeImage} alt="homeImg" width={1920} height={1080} className="select-none min-h-[800px] min-w-[1200px] md:w-full md:h-auto absolute"></Image>
				<div className="w-full h-full bg-stone-900/50 absolute /"></div>
				<div className=" absolute top-0 bottom-20 left-0 right-0 self-center text-center font-normal mx-2">
					<p className="text-xl md:text-2xl">
						<Message code={["home", "mainText1"]} />
					</p>
				</div>
				<div className=" absolute top-32 bottom-20 left-0 right-0 self-center text-center font-extrabold mx-4">
					<p className="text-[36px] md:text-[90px]">
						<Message code={["home", "mainText2"]} />
					</p>
				</div>
			</div>
			<div className="z-10 relative w-full shadow-[0_-6px_6px_1px] shadow-gray-800 dark:shadow-black p-2 flex justify-center">
				<div className="md:w-1/2 mt-2 mx-2">
					<p className="text-center text-sm">
						<Message code={["home", "infoText1"]} />
					</p>
					<p className="text-center text-sm">
						<Message code={["home", "infoText2"]} />
					</p>
					<p className="text-center text-sm">
						<Message code={["home", "infoText3"]} />
					</p>
					<p className="text-center text-sm">
						<Message code={["home", "infoText4"]} />
					</p>
				</div>
			</div>
			<div className="flex w-full justify-center mt-8">
				<div className="w-2/3 flex flex-wrap justify-center gap-y-5">
					{players.map( (p) => {
						return (
							<div key={p.name} className="md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 min-w-[274px]">
								<Player elem={p} />
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex flex-col w-full justify-center items-center gap-4">
				<p className={`text-4xl md:text-[52px] font-bold text-center  ${font.className} mt-14`}>
					<Message code={["home", "goals"]} />
				</p>
				{goalList.map((goal) => {
					return (
						<>
							<HorizontalBar className="w-[70%] h-[2px]" />
							<div className="flex flex-col md:flex-row gap-2 md:justify-between w-2/3 items-center justify-center text-xl">
								<div> {goal.date} </div>
								<div className="flex flex-col md:flex-row md:w-1/2 gap-2 md:gap-10 w-full items-center justify-center">
									<GoalTrophy pos={goal.pos} />
									<p>
										<Message code={["home", "goalList", goal.name]} />
									</p>
								</div>
							</div>
						</>
					);
				})}
			</div>
			<Matches />
		</main>
	);
}
