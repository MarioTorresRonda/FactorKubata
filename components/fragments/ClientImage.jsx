'use client';

import { useMessageText } from "@/hooks/useMessageText";
import Image from "next/image";

export default function ClientImage( { src, alt, priority, ...props } ) {

    const getText = useMessageText();

    return (
        <Image
            priority={priority}
            {...props}
            src={src}
            alt={getText(alt)}
        />
    )
}