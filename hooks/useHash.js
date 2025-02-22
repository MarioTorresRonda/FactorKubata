import { usePathname } from "next/navigation"

export default function useHash() {

    var pathName = usePathname();
    return pathName.substring( pathName.indexOf('#')  );

}