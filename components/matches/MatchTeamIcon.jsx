import Image from "next/image";

export default function MatchTeamIcon( { name, imgBase64 } ) {

    let acronym = ""
    if ( name.length <= 4 ) {
        acronym = name;
    }else if ( name.indexOf(" ") != -1 ) {
        acronym = name.split(" ").map( fragment => fragment.substr(0, 1) ).join("");
    }else{
        acronym = name.substr( 0, 4) 
    }
    acronym = acronym.toUpperCase();


    if ( !imgBase64 ) {
        return <div className="bg-black w-full h-full flex flex-row justify-center items-center ">
            <svg viewBox="0 0 64 64">
                <text y="60%" x="3.2" textLength="57.6" font-weight="bold" lengthAdjust="spacingAndGlyphs"  fill="yellow" > { acronym } </text>
            </svg>
        </div>
    }else{
        return <div className="w-16 h-16 flex flex-row justify-center items-center relative ">
            <Image src={imgBase64} alt={acronym} fill={true} />
        </div>
    }
}