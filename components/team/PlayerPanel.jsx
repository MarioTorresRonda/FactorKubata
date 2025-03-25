import Message from "../fragments/Message";
import FAI from "../fragments/FAI";

export default function PlayerPanel( {rows} ) {

    return <div className="flex flex-col gap-4">
            { rows.map( (row) => {
                return <div key={row.text + row.message.join("")}>
                    <p className="text-2xl font-bold"> <Message code={row.message} /> </p>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-2xl">{ row.text }</p>
                        <FAI className="h-4" icon={ row.icon }></FAI> 
                    </div>
                </div>
            } ) }
        </div>
}