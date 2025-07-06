import { useMessageText } from "@/hooks/useMessageText";
import Message from "../fragments/Message";

const replaceKey = "{0}";

export default function MatchDate( { date } ) {

    
    const getText = useMessageText();

    const now = new Date();
    if ( date > now ) {
        return <div> { parseMatchDate( date ) } </div>
    }

    const agoText = getText( ["commons", "time", "ago"] )
    let timePassed = now.getTime() - date.getTime();
    timePassed /= 60000;
    if ( timePassed < 60 ) {
        let formattedTimePassed = Math.round( timePassed );
        return <div>  { agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(["commons", "time", "minute"])[formattedTimePassed == 1 ?  0 : 1] }`) } </div>
    }
    timePassed /= 60;
    if ( timePassed < 60 ) {
        let formattedTimePassed = Math.round( timePassed );
        return <div>  { agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(["commons", "time", "hour"])[formattedTimePassed == 1 ?  0 : 1] }`) } </div>
    }
    timePassed /= 24;
    if ( timePassed < 7 ) {
        let formattedTimePassed = Math.round( timePassed );
        return <div>  { agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(["commons", "time", "day"])[formattedTimePassed == 1 ?  0 : 1] }`) } </div>
    }
    if ( timePassed < 30 ) {
        timePassed /= 7;
        let formattedTimePassed = Math.round( timePassed );
        return <div>  { agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(["commons", "time", "week"])[formattedTimePassed == 1 ?  0 : 1] }`) } </div>
    }
    timePassed /= 30;
    if ( timePassed < 12 ) {
        let formattedTimePassed = Math.round( timePassed );
        return <div>  { agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(["commons", "time", "month"])[formattedTimePassed == 1 ?  0 : 1] }`) } </div>
    }
    timePassed /= 12;
    let formattedTimePassed = Math.round( timePassed );
    return <div>  { agoText.replace(replaceKey, `${formattedTimePassed} ${ getText(["commons", "time", "year"])[formattedTimePassed == 1 ?  0 : 1] }`) } </div>
    

}