'use client'

import { createContext, useReducer, useState } from 'react';
import { getDefaultLocale, getAsyncLocale, getAsyncBlogLocale } from "@/util/Localization";
import merge from '@/util/Objects';

export const LocalizationContext = createContext({
    lang: {},
    mainLang: {},
    blogLang: {},
    locale: 'en',
    setLocalization: async () => {},
    setBlogLocalization : async () => {}
});

function LocalizationReducer(state, action) {

    if ( action.type == "SET" ) {
        state.mainLang = action.payload.mainLang;
        state.locale = action.payload.locale;
    }

    if ( action.type == "SETBLOG" ) {
        state.blogLang = action.payload.blogLang;
    }

    return state;
}

export default function LocalizationContextProvider( {children} ) {

    const [ localizationState, localizationDispatch ] = useReducer( LocalizationReducer, { lang : {...getDefaultLocale()}, blogLang : {}, locale: 'es' } )

    const [locale, setLocale] = useState(localizationState.locale);
    const [mainLang, setMainLang] = useState(localizationState.lang);
    const [blogLang, setBlogLang] = useState(localizationState.blogLang);

    async function setlocale(locale) {
        const mainLang = await getAsyncLocale( locale );
        localizationDispatch({
            type: "SET",
            payload: { locale : locale, mainLang : mainLang, }
        });
        setLocale( locale );
        setMainLang( mainLang );
    }   

    const ctxValue = {
        lang: merge(mainLang, blogLang),
        locale: locale,
        setLocalization : setlocale,
    }

    return <LocalizationContext.Provider value={ctxValue}>
        {children}
    </LocalizationContext.Provider>

}