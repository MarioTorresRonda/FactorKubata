'use client'

import DinamicColors from "./DinamicColors"
import NavBarItem from "./NavBarItem"
import menus from "@/data/navBar"
import { faList as icon } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { MenuContext } from "@/store/menu-context"
import MediaMode from "./MediaMode"
import FAI from "./FAI"
import { usePathname } from "next/navigation"
import FK from "@/public/FK.png"
import Image from "next/image"

import NavBarModal from "./NavBarModal"

export default function NavBar() {

    const { menu, showValue, show, hide } = useContext( MenuContext );
    const [ actualMenu, setActualMenu ] = useState( menu );
    const [ symbol, setSymbol ] = useState( menus.home.symbol );
    const path = usePathname();

    useEffect(() => {
        if ( actualMenu.symbol != menu.symbol )  {
            setActualMenu( menu );
            hide();
        }
    }, [menu, actualMenu, hide]);

    useEffect(() => {
        Object.keys( menus ).forEach(key => {
            const slashIndex = path.indexOf("/", 2);
            if ( menus[key].url == path.substring(0, slashIndex != -1 ? slashIndex : path.length ) ) {
                setSymbol(menus[key].symbol);
            }
        });
    }, [path]);

    const hiddenClasses = "max-h-0 scale-y-0 opacity-0";
    const showClasses = "max-h-[140px] scale-y-100 opacity-100";
    //Classes that surpass the hidden state when the site is bigger and is not needed
    const forceClasses = "sm:max-h-full sm:h-full sm:scale-y-100 sm:w-auto sm:opacity-100"

    return (
        <div className="flex flex-wrap gap-2 min-h-[10vh] justify-between md:px-40 sm:px-30 px-20 bg-stone-100 dark:bg-stone-900 z-10 relative shadow-md shadow-gray-800 dark:shadow-black ">
            <div className="mt-1">
                <div className="flex justify-around items-center h-full gap-6">
                    <DinamicColors />
                    <MediaMode />
                    <Image src={FK} className="h-[8vh] w-[8vh]" alt="Logo"></Image>
                </div>
            </div>
            <div className="block mt-8 sm:hidden" onClick={() => { showValue ? hide() : show() }}>
                <FAI
                    icon={icon}
                    className={`text-[--myColorStartSimple] w-[35px] h-[35px] transition-transform ease-in-out hover:scale-[1.2] hover:text-[--myColorEndSimple] `}
                />
            </div>
            <div className={`${ showValue ? showClasses : hiddenClasses } ${forceClasses} w-full transition-all flex justify-end self-center flex-col sm:flex-row sm:gap-6`} >
                { Object.keys( menus ).map( (key) => { return <NavBarItem selected={symbol == menus[key].symbol} key={key} newMenu={menus[key]} /> } )  }
                <NavBarModal />
            </div>

        </div>
    )
}