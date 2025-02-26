export default function HorizontalBar( { className } ) {
    
    className = className ?  className : "h-[1px]  w-full";
    
    return ( <div className={className}>
        <div  className={`bg-stone-900 dark:bg-stone-300 h-full`}></div>
    </div> )
}