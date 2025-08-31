'use client'

import FAI from "@/components/fragments/FAI";
import Message from "@/components/fragments/Message";
import {  faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHardDrive } from "@fortawesome/free-regular-svg-icons";

export default function AddButton( { addMatchActive, setAddMatchActive } ) {
    return <button className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center " onClick={() => { setAddMatchActive(!addMatchActive) }} > 
        <FAI 
            icon={faPlus} 
            className={`w-[16px] h-[16px]`}
        />
        <FAI 
            icon={faHardDrive} 
            className={`w-[24px] h-[24px]`}
        />
    </button>

}