'use client'

import { home } from '@/data/navBar';
import { createContext, useReducer } from 'react';

const initialMenu = {
    menu: home,
    showValue: false,
} 

export const MenuContext = createContext(null);

function MenuReducer(state, action) {
    
    if ( action.type == "SET" ) {
        state.menu = action.payload;
    }

    if ( action.type == "SHOW" ) {
        state.showValue = true;
    }

    if ( action.type == "HIDE" ) {
        state.showValue = false;
    }

    return {...state};
}

export default function MenuContextProvider( {children} ) {
    
    const [ menuState, menuDispatch ] = useReducer( MenuReducer, initialMenu )

    function setMenu(menu) {
        menuDispatch({
            type: "SET",
            payload: menu
        }) 
    }

    function show(menu) {
        menuDispatch({
            type: "SHOW"
        }) 
    }

    function hide(menu) {
        menuDispatch({
            type: "HIDE"
        }) 
    }

    const ctxValue = {
        menu: menuState.menu,
        setMenu,
        showValue : menuState.showValue,
        show,
        hide,
    }

    return <MenuContext.Provider value={ctxValue}>
        {children}
    </MenuContext.Provider>

}