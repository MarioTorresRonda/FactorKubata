import { useMessageText } from "@/hooks/useMessageText";

export default function MatchCountdown( {match} ) {

    const getText = useMessageText();

    let text = getText( ["commons", "time", "live"] );

    let timeLeft = Math.trunc( new Date( match.date - new Date() ) / 3600000  ) ;
    if ( timeLeft > 0 ) {
        if ( timeLeft < 24 ) {
            timeLeft = Math.round( timeLeft );
            timeLeft += " Horas"
        }else{
            timeLeft /= 24;
            timeLeft = Math.round( timeLeft );
            timeLeft += " Dias";
        }
    }

    return <div className="w-min text-nowrap mx-2 text-center"> { text } </div>
}