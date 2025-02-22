'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

export default function FAI( { icon, className, ...props } ) {

    const first = useRef(null)

    useEffect(() => {
        first.current.classList.remove("svg-inline--fa");
    }, [icon, first])
    

    return ( <FontAwesomeIcon
    {...props}
    ref={first}
    icon={icon}
    className={`${className} transition-transform ease-in-out `}
    /> )
}