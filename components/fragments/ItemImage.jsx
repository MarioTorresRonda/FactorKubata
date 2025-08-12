import { useFetch } from "@/hooks/useFetch";
import { LoLContext } from "@/store/lol-context";
import { isEmpty } from "@/util/Objects";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";



export default function ItemImage( { itemId, ...props } ) {

	//Cached champ keys and names
    const { getItems } = useContext(LoLContext);
    const [ _itemId, setItemId ] = useState(itemId)

	const {
		isFetching,
		fetchedData: item,
        error,
		setFetchedData: setChampion,
	} = useFetch(getItems, _itemId, {}, []);

    if ( error ) {
        toast( error.message, { type:"error", theme:"colored" } );
    }

    if ( item === undefined || isEmpty( item ) ) {
        return <></>
    }

    if ( isFetching || error || !item ) {
        return <></>
    }

    return <Image {...props} alt={item.name} src={item.imgPath} />
    
}