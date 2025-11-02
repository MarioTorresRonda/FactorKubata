import Message from "@/components/fragments/Message";
import PrettyInput from "@/components/fragments/PrettyInput";
import { useCallback, useEffect, useState } from "react";
import AddMatchGameData from "./AddMatchGameData";
import { useMessageText } from "@/hooks/useMessageText";
import FAI from "@/components/fragments/FAI";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SliderCheck, { SliderColors } from "@/components/fragments/SliderCheck";
import PrettySelect from "@/components/fragments/PrettySelect";

export default function AddMatchGamePov( { participants, pov, editPOV, removePOV } ) {

    function onChampChange(event) {
        editPOV( pov.id, "champ", event.target.value )
    }

    function onURLChange(event) {
        editPOV( pov.id, "url", event.target.value )
    }

    return <div className="flex flex-row w-full gap-2">
         <PrettySelect className="w-40 rounded-md h-8" onChange={onChampChange} value={pov.champ}  >
            { participants.map( player => {
                return <option key={player.SKIN} value={player.SKIN}> {player.SKIN} </option> 
            } )  }
        </PrettySelect>
        <PrettyInput className="w-full rounded-md" value={pov.url} onChange={onURLChange} ></PrettyInput>
        <button 
            className="bg-stone-300 dark:bg-stone-700 p-2 px-3 gap-1 rounded-md flex flex-row items-center justify-center"
            onClick={() => { removePOV(pov.id) }}>
            <FAI className="h-4 w-4" icon={faTrashAlt} />
        </button> 
    </div>
}