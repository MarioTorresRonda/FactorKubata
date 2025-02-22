import useUtilsSearchParam from "@/hooks/useUtilsSearchParam";
import { useEffect, useState } from "react";


export default function ScrollAnchor( {anchor, children} ) {


    const [ initialized, setInitialized ] = useState( false );

    const { getQuery } = useUtilsSearchParam()
    const queryValue = encodeURIComponent( getQuery( "chapter" ) );
    const [highlight, setHighlight] = useState(false)
    
    const classes = `transition-all ${ highlight ? "animate-highlight" : "" } `;

    useEffect(() =>  {
        if ( initialized ) {
            if ( queryValue == anchor ) {
                setHighlight( queryValue == anchor )
                const timeout = setTimeout(() => {
                    setHighlight( false );
                }, 1200);
                
                return () => {
                    setHighlight( false );
                    clearTimeout( timeout );
                }
            }
        }
    }, [queryValue, anchor, initialized]);

    useEffect(() => {
        setTimeout( () => {
            setInitialized( true )
        }, 3500)
    }, [])
    



    return <div className={classes} id={anchor} key={anchor}> {children} </div>
}