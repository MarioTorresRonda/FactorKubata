import { useRouter } from "next/navigation";
import { useContext } from "react";

export function useNavigate( MenuContext ) {

    
    const router = useRouter();
    
    function navigate( newMenu, extraRoute ) {
        extraRoute = extraRoute ? extraRoute : "";
        router.push(newMenu.url +"/"+ extraRoute );
    }

    return { navigate };
}