'use client'

import {Roboto_Condensed} from "next/font/google";
import Image from "next/image";

import bg1 from "@/public/backgrounds/1.jpeg";
import bg2 from "@/public/backgrounds/2.jpeg";
import bg3 from "@/public/backgrounds/3.jpeg";
import bg4 from "@/public/backgrounds/4.jpeg";

const font = Roboto_Condensed({subsets: ["latin"]});
const backgroundList = [ bg1, bg2, bg3, bg4 ];

export default function Player({elem}) {
	return (
		<div className="flex flex-col text-center bg-white-700 items-center relative group *:transition-all *:duration-300">
			<div className="absolute -z-10 w-[250px] h-[350px] group-hover:scale-90">
				<Image src={ backgroundList[ Math.trunc(Math.random() * backgroundList.length ) ] } fill={true} alt="background" />
			</div>
            <div className="absolute -z-10 w-[250px] h-[350px] bg-black/50 group-hover:scale-90">
			</div>
			<div className="overflow-hidden w-[250px] h-[300px] mt-[30px] group-hover:scale-[110%]" >
				<Image src={elem.imgSrc} alt={"player" + elem.name}></Image>
			</div>
			<div className={`px-4 py-2 bg-stone-300 text-black w-full ${font.className} items-center flex flex-col gap-2 z-10`}>
				<p className="text-2xl font-bold">{elem.name}</p>
				<div className="p-2 bg-stone-900 relative h-12 w-12">
					{  elem.old &&
					<div className="absolute text-white font-extrabold h-8 w-8 text-2xl top-2 bg-stone-900/30 select-none">
						X
					</div> }
					{  elem.sub &&
					<div className="absolute text-white font-extrabold h-8 w-8 text-2xl top-2 bg-stone-900/30 select-none">
						S
					</div> }
					<div> <Image src={elem.role.icon} alt={elem.name}></Image> </div>
				</div>
			</div>
		</div>
	);
}
