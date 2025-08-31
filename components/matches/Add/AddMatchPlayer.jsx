import Message from "@/components/fragments/Message";
import PrettyInput from "@/components/fragments/PrettyInput";

export default function AddMatchPlayer( { player, editing, setPlayer } ) {

    return <div className="flex flex-row gap-4 px-9 py-2 odd:bg-black/20">
        <div className="w-1/2 flex flex-col">
            <p className="pl-2"> <Message code={["home", "matches", "addMatchTeamName"]} />:  </p>
            { !editing  && <p className="pl-2"> {player.name} </p> }
            { editing  && <PrettyInput className="w-60 rounded-md" ></PrettyInput> }
        </div>
        <div className="w-1/2 flex flex-col">
            <p className="pl-2"> <Message code={["home", "matches", "addMatchTeamUUID"]} />: </p>
            { !editing  && <p className="pl-2"> {player.uuid} </p> }
            { editing  && <PrettyInput className="w-60 rounded-md" ></PrettyInput> }
            
        </div>
    </div>
}