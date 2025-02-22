'use client'

import { MenuContext } from "@/store/menu-context";
import { useNavigate } from "@/hooks/useNavigate";
import { useMessageText } from "@/hooks/useMessageText";

export default function NavBarItem( { newMenu, selected } ) {

    const { navigate } = useNavigate( MenuContext);
    const getText = useMessageText();
    
    const menuText = getText( newMenu.title )

    function onHandleClick() {
        navigate( newMenu );
    }

    return (
        <div className="flex h-[100%] p-2 items-center z-10 justify-end" >
            <button className="flex flex-row sm:flex-col items-center" onClick={() => onHandleClick()}>
                <p> { selected && <span className="text-sm color-dinamico-texto" > {">"}. </span> } {menuText} </p>
            </button>
        </div> 
    )
}