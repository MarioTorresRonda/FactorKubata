export const SliderColors = {
    sliderColor : {
        default : "bg-stone-600",
        dark : "bg-black/20",
    },
    dotColor : {
        default : "bg-stone-300",
        lose: "bg-red-400"
    },
    activeColor : {
        default : "bg-stone-500",
        win: "bg-green-600"
    }
}

export default function SliderCheck( { value, onClick, className, sliderColor, dotColor, activeColor }  ) {

    if ( !sliderColor ) { sliderColor = SliderColors.sliderColor.default }
    if ( !dotColor ) { dotColor = SliderColors.dotColor.default }
    if ( !activeColor ) { activeColor = SliderColors.activeColor.default }


    return <div onClick={onClick} className={" relative my-2 mx-4 " + className} >
        <div className={`h-[40%] w-full ${sliderColor} absolute top-[50%] translate-y-[-50%] rounded-sm`}> </div>
        <div className={`h-full aspect-square absolute transition-all ease-in-out duration-500 rounded-xl ${ value ? `left-full translate-x-[-100%] ${activeColor}` : `left-0 ${dotColor} ` } `}></div>
    </div>
}