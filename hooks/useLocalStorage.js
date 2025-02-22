import React, { useEffect, useState } from 'react';

export default function useLocalStorage() {

    const [localStorage, setLocalStorage] = useState( {} );

    useEffect(() => {
        function updateStorage() {
            setLocalStorage( {...window.localStorage} );
        }
        updateStorage();

        window.addEventListener('storage', updateStorage);
        return () => window.removeEventListener('storage', updateStorage);

    }, []);

    return localStorage;
}