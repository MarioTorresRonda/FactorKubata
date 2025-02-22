import { Roboto_Condensed } from "next/font/google";

import Image from "next/image";
import homeImage from "@/public/FrontImage.jpg"
import Player from "@/components/home/player";
import { players } from "@/data/players";

const font = Roboto_Condensed({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <div className={`z-0 -mt-40 h-[800px] overflow-hidden animate-fromTop relative  text-white ${font.className}`}>

          <Image src={homeImage} alt="homeImg" className="w-full absolute"></Image>
          <div className="w-full h-full bg-stone-900/50 absolute /">
          </div>
          <div className=" absolute top-0 bottom-0 left-0 right-0 self-center text-center font-normal">
            <p className="text-2xl">NUESTRO EQUIPO</p>
          </div>
          <div className=" absolute top-32 bottom-0 left-0 right-0 self-center text-center font-extrabold">
            <p className="text-[90px]"> FACTOR KUBATA </p>
          </div>
      </div>
      <div className="z-10 relative w-full shadow-[0_-6px_6px_1px] shadow-gray-800 dark:shadow-black p-2 flex justify-center">
        <div className="w-1/2 mt-2">
          <p className="text-center text-sm">
          ¡Bienvenidos a FactorKubata, el equipo de League of Legends que está aquí para demostrar que la verdadera magia del juego está en la diversión (y en el Barón robado en el último segundo)!
          </p>
          <p className="text-center text-sm">
          Somos un grupo de jugadores que están dando sus primeros pasos en el competitivo, pero no por eso vamos a dejar que nos ganen fácilmente (o eso esperamos). En FactorKubata creemos que las partidas se ganan con buenas rotaciones, un ward a tiempo y, por supuesto, tilteando lo menos posible.
          </p>
          <p className="text-center text-sm">
          Si buscas un equipo profesional de alto rendimiento... bueno, aún no llegamos a eso, pero si te gustan las buenas risas, las jugadas inesperadas y un ambiente donde el GGWP se dice de corazón, ¡entonces estás en el lugar correcto!
          </p>
          <p className="text-center text-sm">
          ¡Síguenos en esta aventura, donde el objetivo no es solo escalar en la clasificatoria, sino también pasarla bien y, con suerte, no hacer un "int" demasiado descarado! 🌟
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center mt-8 mb-32">
        <div className="w-2/3 flex flex-wrap justify-center gap-y-5">
        {  players.map( (p, index) => {
            return ( <div className="w-full md:w-1/2 xl:w-1/4 px-3">
              <Player key={p.name} elem={p} />
            </div> )
          } ) }
        </div>
      </div>
    </main>
  );
}
