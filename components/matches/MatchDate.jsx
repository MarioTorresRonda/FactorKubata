import { useMessageText } from "@/hooks/useMessageText";
import Message from "../fragments/Message";
import { useState } from "react";
import { parseMatchDate } from "@/util/dates";

const replaceKey = "{0}";

export default function MatchDate( { date } ) {

    const [expanded, setExpanded] = useState(false)

    const getText = useMessageText();

    const now = new Date();
    if ( date > now ) {
        return <div> { parseMatchDate( date ) } </div>
    }

    let dateString = "";
    if ( expanded ) {
        dateString = parseMatchDate( date );
    }else{
        const segments = [ 
            { operation: 60000, max: 60, text: ["commons", "time", "minute"] },
            { operation: 60, max: 24, text: ["commons", "time", "hour"] },
            { operation: 24, max: 30, text: ["commons", "time", "day"] },
            { operation: 30, max: 12, text: ["commons", "time", "month"] },
            { operation: 12, max: 100, text: ["commons", "time", "year"] },
        ]

        let segmentIndex = -1;
        const agoText = getText( ["commons", "time", "ago"] )
        let timePassed = now.getTime() - date.getTime();
        do{
            segmentIndex++;
            timePassed /= segments[segmentIndex].operation;
            if ( timePassed <= segments[segmentIndex].max ) {
                let formattedTimePassed = Math.round( timePassed );
                dateString = agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(segments[segmentIndex].text)[formattedTimePassed == 1 ?  0 : 1] }`);
            }
        }  while( timePassed > segments[segmentIndex].max )

    }

    return <button onClick={() => { setExpanded( oldExpanded => !oldExpanded ) }}> {dateString} </button>


}