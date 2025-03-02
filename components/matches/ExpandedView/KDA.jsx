export default function KDA({ kills, deaths, assists, className }) {
    return <div className={"flex flex-row " + className } >
        <p className="w-4 text-center"> { kills } </p>
        /
        <p className="w-4 text-center"> { deaths } </p>
        /
        <p className="w-4 text-center"> { assists } </p>
    </div>
}