'use client';

import LocalizationContextProvider from "@/store/location-context";
import LoLContextProvider from "@/store/lol-context";
import MenuContextProvider from "@/store/menu-context";

export default function Providers({ children }) {
  return (
      <LocalizationContextProvider>
        <MenuContextProvider>
          <LoLContextProvider>
            {children}
          </LoLContextProvider>
        </MenuContextProvider>
      </LocalizationContextProvider>
        
  );
}