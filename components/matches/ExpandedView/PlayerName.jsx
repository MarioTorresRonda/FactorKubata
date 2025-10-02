import FAI from "@/components/fragments/FAI"
import { faEye as povIcon } from "@fortawesome/free-regular-svg-icons"
import { useRouter } from "next/navigation";

export default function PlayerName( { className, team, player } ) {

    const pov = player.POV;
    const router = useRouter()

    function getPlayerName( player ) {

        const puuid = player.PUUID;
        let playerName;

        if ( team.team ) {
            Object.values( team.team.players ).forEach( teamPlayer => {
                if ( teamPlayer.uuid == puuid ) {
                    playerName = teamPlayer.name;
                    return;
                }
            });
        }

        if ( !playerName ) {
            playerName = player.NAME;
        }

        if ( ! playerName ) {
            playerName = '? ? ?';
        }

        return playerName
    }
    
    function onHandleSubmit( url ) {
        router.push(url, { scroll: false })
	}

    return (
        <div className={`w-[44%] px-2 flex flex-row items-center gap-2 ${className}`}>
            <p className={" font-semibold "} > { getPlayerName( player ) } </p> 
            { pov && <button onClick={() => { onHandleSubmit(pov) } }> <FAI  className={"h-4 w-full hover:animate-pulse "} icon={povIcon}></FAI> </button> }
        </div>
    )
}