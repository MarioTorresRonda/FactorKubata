import { useRouter } from "next/navigation";

export function useNavigate() {
    
    const router = useRouter();
    
    function navigate( newMenu, extraRoute ) {
        extraRoute = extraRoute ? extraRoute : "";
        router.push(newMenu.url +"/"+ extraRoute );
    }

    function refresh() {
        router.refresh();
        window.location.reload()
    }

    return { navigate, refresh };
}