import { useFetch } from "@/hooks/useFetch";
import { LoLContext } from "@/store/lol-context";
import { isEmpty } from "@/util/Objects";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function ChampionImage( { championId, ...props } ) {

	//Cached champ keys and names
    const { getChampions } = useContext(LoLContext);
    const [championKey, setChampionKey] = useState(championId)

	const {
		isFetching,
		fetchedData: champion,
        error,
		setFetchedData: setChampion,
	} = useFetch(getChampions, championKey, {}, []);

    if ( error ) {
        toast( error.message, { type:"error", theme:"colored" } );
    }

    if ( champion === undefined || isEmpty( champion ) ) {
        return <></>
    }

    if ( isFetching || error || !champion ) {
        return <></>
    }

    return <Image 
        {...props} 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={champion.name} 
        src={champion.imgPath}
    />
    
}