'use client'

import { getCodeFromArray } from "@/util/Localization";
import { useContext } from "react";
import { LocalizationContext } from "@/store/location-context";
import { isObject } from "@/util/Objects";

export default function Message( { code } ) {
    const { lang } = useContext( LocalizationContext );
    let message = getCodeFromArray( lang, code );

    if ( isObject( message ) || Array.isArray( message ) ) {
        throw new Error( "You are sending a code that does not result in text, look the code:" + code )
    }

    return ( <>{message}</> )
}