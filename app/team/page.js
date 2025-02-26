import {Roboto_Condensed} from "next/font/google";

const font = Roboto_Condensed({subsets: ["latin"]});

export default function Home() {
	return (
		<main className="mb-32 text-5xl w-full h-full flex align-middle justify-center mt-10">
			<p> EN PROCESO... </p>
		</main>
	);
}
