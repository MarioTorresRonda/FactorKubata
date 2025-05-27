export default function SliderCheck( { value, onClick, className }  ) {
    return <div onClick={onClick} className={" relative my-2 mx-4 " + className} >
        <div className="h-[40%] w-full bg-stone-600 absolute top-[50%] translate-y-[-50%] rounded-sm"> </div>
        <div className={`h-full aspect-square absolute transition-all ease-in-out duration-500 rounded-xl ${ value ? "left-full translate-x-[-100%] bg-stone-300" : "left-0 bg-stone-500" } `}></div>
    </div>
}