import React, { useLayoutEffect, useState } from 'react';

export default function useWindowScroll() {
    
    const [windowScroll, setWindowScroll] = useState([0, 0]);
    
    useLayoutEffect(() => {
        function updateSize() {
            setWindowScroll([window.scrollX, window.scrollY]);
        }
        updateSize();

        window.addEventListener('scroll', updateSize);
        return () => window.removeEventListener('scroll', updateSize);

    }, []);

    return windowScroll;
}