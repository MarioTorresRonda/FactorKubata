import { faLightbulb as icon } from "@fortawesome/free-solid-svg-icons"
import useLocalStorage from "@/hooks/useLocalStorage"
import FAI from "./FAI";
import { useMessageText } from "@/hooks/useMessageText";
import Tooltip from "./Tooltip";

const tailwindD = "group-hover:max-h-0 group-hover:max-w-0 group-hover:top-5 group-hover:max-h-10 group-hover:max-w-10 group-hover:max-h-14 group-hover:max-w-14 group-hover:max-w-4 group-hover:top-0 group-hover:-top-2"

export default function MediaMode() {
    
    const getText = useMessageText();
    const localStorage = useLocalStorage();

    const mediaText = localStorage.theme == 'light' ? "darkMode" : "lightMode";

    const light = localStorage.theme == 'light' ? 'group-hover:' : '';
    const dark = localStorage.theme == 'dark' ? 'group-hover:' : '';

    const growAnimation = "transition-all duration-300";
    const smallCircleAnimation = `h-10 w-10 ${light}max-h-0 ${light}max-w-0 ${light}top-5 ${dark}max-h-10 ${dark}max-w-10 ${dark}top-0 ${growAnimation}`;
    const bigCircleAnimation = `h-14 w-14 ${light}max-h-0 ${light}max-w-0 ${light}top-5 ${dark}max-h-14 ${dark}max-w-14 ${dark}-top-2 ${growAnimation}`;
    
    function onHandleMediaClick() {
        const mode = ( localStorage.theme == 'light' ? 'dark' : 'light');
        window.localStorage.setItem('theme', mode);
        window.dispatchEvent(new Event("storage"));
    }

    return (
        <button aria-label={getText(["commons", "configuration", mediaText])} onClick={onHandleMediaClick} className="relative h-10 w-10 flex justify-center group hover:scale-[1.2] transition duration-75">
            <div className={`absolute rounded-[100px] dark:bg-[--myColorStartSimple] bg-[--myColorEndSimple] ${smallCircleAnimation} opacity-80 dark:opacity-40`}>
            </div>
            <div className={`absolute rounded-[100px] dark:bg-[--myColorStartSimple] bg-[--myColorEndSimple] ${bigCircleAnimation} opacity-20 dark:opacity-10`}>
            </div>
            <div className="absolute self-center top-2">
                <Tooltip className="" text={getText(["commons", "configuration", mediaText])}>
                    <FAI
                        icon={icon}
                        className={`w-[35px] h-[35px] text-slate-500 dark:text-stone-700`}
                    />
                </Tooltip>
            </div>
        </button>
    )
}