'use client';

import LocalizationContextProvider from "@/store/location-context";
import MenuContextProvider from "@/store/menu-context";

export default function Providers({ children }) {
  return (
      <LocalizationContextProvider>
        <MenuContextProvider>
          {children}
        </MenuContextProvider>
      </LocalizationContextProvider>
        
  );
}