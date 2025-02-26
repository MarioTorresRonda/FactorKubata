import FAI from "@/components/fragments/FAI";

import { faTrophy as icon } from "@fortawesome/free-solid-svg-icons"

export default function GoalTrophy( {pos} ) {

    let className = "h-8 ";
    const num = pos.substr(0, 1) 
    if ( num == "1" ) {
        className += "text-orange-400";
    }else if (num == "2") {
        className += "text-stone-400";
    }else if ( num == "3" ) {
        className += "text-amber-900";
    }

    return  <div>  <FAI icon={icon} className={className} /> </div>
}