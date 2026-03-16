'use client';

import { useFetch } from "@/hooks/useFetch";
import LocalizationContextProvider from "@/store/location-context";
import LoLContextProvider, { LoLContext } from "@/store/lol-context";
import MenuContextProvider from "@/store/menu-context";
import { useContext } from "react";

export default function InitProviders({ children }) {

    //Cached champ keys and names
    const { loadContext } = useContext( LoLContext );
    useFetch(loadContext, null, {}, []);

  return <></>;
}


