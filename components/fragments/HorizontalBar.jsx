export default function HorizontalBar( { className } ) {
    
    className = className ?  className : "h-[1px]  w-full";
    
    return ( <div className={className}>
        <div  className={`color-fondo h-full`}></div>
    </div> )
}