'use client';

import LocalizationContextProvider from "@/store/location-context";
import LoLContextProvider from "@/store/lol-context";
import MenuContextProvider from "@/store/menu-context";
import InitProviders from "./InitProviders";

export default function Providers({ children }) {
  return (
      <LocalizationContextProvider>
        <MenuContextProvider>
          <LoLContextProvider>
            <InitProviders/>
            {children}
          </LoLContextProvider>
        </MenuContextProvider>
      </LocalizationContextProvider>
        
  );
}