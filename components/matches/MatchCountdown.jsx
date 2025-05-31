export default function MatchCountdown( {match} ) {

    let timeLeft = Math.trunc( new Date( match.date - new Date() ) / 1000 / 60 / 60 ) ;
    if ( timeLeft < 24 ) {
        timeLeft = Math.round( timeLeft );
        timeLeft += " Horas"
    }else{
        timeLeft /= 24;
        timeLeft = Math.round( timeLeft );
        timeLeft += " Dias";
    }

    return <div className="w-[12%] text-center"> quedan: { timeLeft } </div>
}