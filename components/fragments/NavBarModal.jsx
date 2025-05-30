'use client'

import { faSignIn as signInIcon } from "@fortawesome/free-solid-svg-icons"
import Modal from "./Modal"
import Message from "./Message"
import { useMessageText } from "@/hooks/useMessageText"
import PrettyInput from "./PrettyInput"
import { useRef, useState } from "react"
import FAI from "./FAI"
import { useNavigate } from "@/hooks/useNavigate"
import { MenuContext } from "@/store/menu-context"

export default function NavBarModal() {
    
    const getText = useMessageText();
    const modalRef = useRef();
    const [passwordValue, setPasswordValue] = useState("");
    const { refresh } = useNavigate( MenuContext );

    function onHandleClick() {
        modalRef.current.open();
    }
    function onHandleSubmit() {
        if ( passwordValue ) {
            document.cookie = `token=${passwordValue}`;
            refresh()
        }
    }
    function onHandleChange( event ) {
        setPasswordValue( event.target.value )
    }
    
    return ( <div className="h-10 aspect-square dark:bg-stone-700 bg-stone-200 rounded-md">
        <button onClick={onHandleClick} className="w-full h-full">
            <FAI className="m-2" icon={signInIcon}/> 
        </button>
            <Modal
            title={getText(["commons", "admin", "title"])}
            submit={true}
            onSubmit={onHandleSubmit}
            ref={modalRef}
            cancelText={getText(["commons", "admin", "back"])}
            submitText={getText(["commons", "admin", "accept"])}
        > 
            <div className="flex flex-col gap-4">
                <Message code={["commons", "admin", "desc"]}></Message>
                <PrettyInput type="password" onChange={ (event) => { onHandleChange(event) }} className="w-[300px]" value={passwordValue} />
            </div>
        </Modal>
    </div> )
}