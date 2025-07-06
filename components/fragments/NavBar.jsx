'use client'

import DinamicColors from "./DinamicColors"
import NavBarItem from "./NavBarItem"
import { faList as icon } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef, useState } from "react"
import { MenuContext } from "@/store/menu-context"
import MediaMode from "./MediaMode"
import FAI from "./FAI"
import { usePathname } from "next/navigation"
import FK from "@/public/FK.png"
import Image from "next/image"

import NavBarModal from "./NavBarModal"
import { fetchNavBar } from "@/http"
import { useFetch } from "@/hooks/useFetch"
import { getCookie } from "@/util/cookies"

export default function NavBar() {

    const { menu, showValue, show, hide } = useContext( MenuContext );
    const [ actualMenu, setActualMenu ] = useState( menu );
    const [ symbol, setSymbol ] = useState(  );
    const path = usePathname();

    const [navBarBody, setNavBarBody] = useState( null )

    const {
        isFetching, 
        fetchedData : menus,
        error,
        setFetchedData : setMenus
    } = useFetch( fetchNavBar, navBarBody, {}, [] );


    useEffect(() => {
        setNavBarBody( { token : getCookie("token") } );
    }, [])
    

    useEffect(() => {
        if ( actualMenu.symbol != menu.symbol )  {
            setActualMenu( menu );
            hide();
        }
    }, [menu, actualMenu, hide]);

    useEffect(() => {
        if ( Object.keys(menus).length ) {
            setSymbol( menus.home.symbol )
            Object.keys( menus ).forEach(key => {
                const slashIndex = path.indexOf("/", 2);
                if ( menus[key].url == path.substring(0, slashIndex != -1 ? slashIndex : path.length ) ) {
                    setSymbol(menus[key].symbol);
                }
            });
        }
    }, [path, menus]);

    const hiddenClasses = "max-h-0 scale-y-0 opacity-0 ";
    const showClasses = "max-h-[200px] scale-y-100 opacity-100";
    //Classes that surpass the hidden state when the site is bigger and is not needed
    const forceClasses = "md:max-h-full md:h-full md:scale-y-100 md:w-auto md:opacity-100"

    return (
        <div className="flex md:flex-row md:justify-between  pt-2 justify-center flex-col xl:px-40 md:px-30 sm:px-20 px-10 min-h-[10vh] bg-stone-100 dark:bg-stone-900 z-10 shadow-md shadow-gray-800 dark:shadow-black relative">
            <div className="flex flex-row justify-between">
                <div className="mt-1">
                    <div className="flex justify-around items-center h-full gap-4">
                        <DinamicColors />
                        <MediaMode />
                        <Image src={FK} className="w-14 lg:w-20 aspect-square" alt="Logo"></Image>
                    </div>
                </div>
                <div className="block my-auto md:hidden" onClick={() => { showValue ? hide() : show() }}>
                    <FAI
                        icon={icon}
                        className={`text-[--myColorStartSimple] w-[35px] h-[35px] transition-transform ease-in-out hover:scale-[1.2] hover:text-[--myColorEndSimple] `}
                        />
                </div>
            </div>
            <div className={`${ showValue ? showClasses : hiddenClasses } ${forceClasses} w-full transition-all flex justify-end self-center flex-col md:flex-row md:gap-4 mb-2`} >
                { Object.keys( menus ).map( (key) => { return <NavBarItem selected={symbol == menus[key].symbol} key={key} newMenu={menus[key]} /> } )  }
                <NavBarModal />
            </div>
        </div>
    )
}