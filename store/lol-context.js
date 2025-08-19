'use client'

import { fetchChampionList, fetchItemsList } from '@/http';
import { createContext, useCallback, useReducer } from 'react';

const initialLoL = {
    champions : {},
    championsKeys : {},
    itemsID : {},
} 

export const LoLContext = createContext(null);

function lolReducer(state, action) {

    if ( action.type == "ADD_CHAMPS" ) {
        state.champions = action.payload.response.championsNameListTrimmed;
        state.championsKeys = action.payload.response.championsKeyListTrimmed; 
    }

    if ( action.type == "ADD_ITEMS_ID" ) {
        state.itemsID = action.payload.itemList;
    }

    return state;
}

export default function LoLContextProvider( {children} ) {

    const [ lolState, lolDispatch ] = useReducer( lolReducer, initialLoL )

    const getChampions = useCallback( async ( championId ) => {

        if ( !championId ) {
            throw new Error("championId on getChampions was null")
        }
        
        if ( Number.isInteger( Number( championId ) ) ) {
            if ( lolState.championsKeys[championId] ) {
                return lolState.championsKeys[championId];
            }
        }else{
            if ( lolState.champions[championId] ) {
                return lolState.champions[championId];
            }
        }
        
        const response = await fetchChampionList();
        lolDispatch({
            type: "ADD_CHAMPS",
            payload: {
                response
            },
        });

        return Number.isInteger( Number( championId ) ) ? response.championsKeyListTrimmed[championId] : response.championsNameListTrimmed[championId];

    }, [ lolState ]  );

    const getItems = useCallback( async ( itemId ) => {

        if ( !itemId ) {
            throw new Error("itemsID on getItems was null")
        }

        if ( lolState.itemsID[itemId] ) {
            return lolState.itemsID[itemId];
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const itemList = await fetchItemsList( {}, signal);
        lolDispatch({
            type: "ADD_ITEMS_ID",
            payload: {
                itemList
            },
        }) 
        
        return itemList[itemId];

    }, [ lolState.itemsID ]  )

    const ctxValue = {
        getChampions,
        getItems
    }

    return <LoLContext.Provider value={ctxValue}>
        {children}
    </LoLContext.Provider>

}