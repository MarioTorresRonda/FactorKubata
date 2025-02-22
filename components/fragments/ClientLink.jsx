'use client'

import { useNavigate } from "@/hooks/useNavigate";
import { MenuContext } from "@/store/menu-context";

export default function ClientLink( { newMenu, url, children }  ) {

  const { navigate } = useNavigate( MenuContext);

  return (
    <button onClick={() => navigate( newMenu, url )}>
      <p className="text-stone-500 dark:text-stone-400">
        {children}
      </p>
    </button>
  );
}
