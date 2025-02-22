'use client'

import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { LocalizationContext } from "@/store/location-context";
import { useContext } from "react";
import FAI from "./FAI";

export default function Localization( { className, absolute } ) {

  className = className ? className : "";
  const { locale, lang, setLocalization } = useContext( LocalizationContext );

  function setLocale(e) {
    e.stopPropagation();
    const newLocale = ( locale == 'en' ? 'es' : 'en')
    setLocalization( newLocale );
  }

  const absoluteClasses = "absolute top-5 right-5 w-[20px] h-[20px] md:w-[35px] md:h-[35px] lg:w-[50px] lg:h-[50px] text-slate-500 dark:text-stone-700 hover:text-slate-700 dark:hover:text-stone-500"
  const initialClasses = "h-7 w-7"

  return (
      <div className={`${ absolute ? absoluteClasses : initialClasses }`}>
        <button onClick={setLocale} className="w-full h-full" >
          <FAI 
              icon={faGlobe}
              className={`h-full transition-transform ease-in-out hover:scale-[1.2] ${className}`}
          />
        </button>
      </div>
  );
}
