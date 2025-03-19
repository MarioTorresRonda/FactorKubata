import FAI from "@/components/fragments/FAI";

import { fa9, faTrophy, fa5  } from "@fortawesome/free-solid-svg-icons"

export default function GoalTrophy( {pos} ) {

    let icon = faTrophy;

    let className = "h-8 ";
    const num = pos.substr(0, 1) 
    if ( num == "1" ) {
        className += "text-orange-400";
    }else if (num == "2") {
        className += "text-stone-400";
    }else if ( num == "3" ) {
        className += "text-amber-900";
    }else if ( num == "5" ) {
        className += "text-black/30";
        icon = fa5;
    }else{
        className += "text-black/30";
        icon = fa9;
    }

    return  <div className="w-10 flex justify-center"> <FAI icon={icon} className={className} /> </div>
}