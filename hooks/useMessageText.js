import { LocalizationContext } from "@/store/location-context";
import { getCodeFromArray } from "@/util/Localization";
import { useContext } from "react";

export function useMessageText() {
    const { lang } = useContext( LocalizationContext );

    function getText( code ) {
        return getCodeFromArray( lang, code )
    }

    return getText;
}