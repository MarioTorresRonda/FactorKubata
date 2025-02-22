'use client'

import { useMessageText } from "@/hooks/useMessageText";
import { updateBubbleColors } from "@/util/DinamicColor";
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

export default function DinamicColors() {
    
    const getText = useMessageText();
    const [time, setTime] = useState(0);
    const [ update, setUpdate] = useState(1);
    const [ color1, setColor1 ] = useState( [ 10, 73, 148 ] );
    const [ color2, setColor2 ] = useState( [ 171, 247, 243 ] );

    updateBubbleColors( color1, color2, time );

    useEffect( () => {
        const timer = setTimeout(() => {
            if ( time >= 50 || time < 0 ) {
                setUpdate( prevUpdate => prevUpdate * -1 );
                setTime( prevtime => prevtime - update * 2 );
            }else{

                setTime( prevtime => prevtime + update );
            }
            
        }, 50);
        return () => {
            clearTimeout( timer );
        }

    }, [time, update]) 

    return (
        <div> 
        </div>
    )
}