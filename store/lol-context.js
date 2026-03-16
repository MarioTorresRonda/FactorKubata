'use client'

import { fetchChampionList, fetchItemsList } from '@/http';
import { createContext, useCallback, useReducer } from 'react';

const initialLoL = {
    champions : {},
    championsKeys : {},
    itemsID : {},
    loaded: false
} 

export const LoLContext = createContext(null);

function lolReducer(state, action) {

    if ( action.type == "ADD_CHAMPS" ) {
        state.loaded = true;
        state.champions = action.payload.response.championsNameListTrimmed;
        state.championsKeys = action.payload.response.championsKeyListTrimmed; 
    }

    if ( action.type == "ADD_ITEMS_ID" ) {
        state.itemsID = action.payload.itemList;
    }

    return state;
}

function until(condition, { interval = 100, timeout = 5000 } = {}) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      if (condition()) return resolve();
      if (Date.now() - start > timeout) return reject(new Error("Timeout"));
      setTimeout(check, interval);
    };

    check();
  });
}

export default function LoLContextProvider( {children} ) {

    const [ lolState, lolDispatch ] = useReducer( lolReducer, initialLoL )

    const loadContext = useCallback( async ( championId ) => {
        const response = await fetchChampionList();

        lolDispatch({
            type: "ADD_CHAMPS",
            payload: {
                response
            },
        });

        const controller = new AbortController();
        const signal = controller.signal;
        const itemList = await fetchItemsList( {}, signal);
        lolDispatch({
            type: "ADD_ITEMS_ID",
            payload: {
                itemList
            },
        }) 
    }, [ lolState ]  );

    const getChampions = useCallback( async ( championId ) => {

        if ( !championId ) {
            throw new Error("championId on getChampions was null")
        }

        await until(() => lolState.loaded == true, { timeout: 10000 });
        
        if ( Number.isInteger( Number( championId ) ) ) {
            if ( lolState.championsKeys[championId] ) {
                return lolState.championsKeys[championId];
            }
        }else{
            if ( lolState.champions[championId] ) {
                return lolState.champions[championId];
            }
        }        
    }, [ lolState ]  );

    const getItems = useCallback( async ( itemId ) => {

        if ( !itemId ) {
            throw new Error("itemsID on getItems was null")
        }

        await until(() => lolState.loaded == true, { timeout: 10000 });

        if ( lolState.itemsID[itemId] ) {
            return lolState.itemsID[itemId];
        }

    }, [ lolState.itemsID ]  )

    const ctxValue = {
        loadContext,
        getChampions,
        getItems
    }

    return <LoLContext.Provider value={ctxValue}>
        {children}
    </LoLContext.Provider>

}