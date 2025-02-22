//We use this fragment to reutilize the files processed by formatCodeText

import { formatCodeText } from "@/util/CodeFormatter";
import { createContext, useCallback, useReducer } from "react";
import crypto from 'crypto';
import { fetchCodeBoxFile } from "@/components/codeBox/http";


const initialCodeBox = {
    loadedFiles: {},
    formattedFiles: {},
} 

export const CodeBoxContext = createContext(null);

function CodeBoxReducer(state, action) {

    if ( action.type == "ADD_LOADED" ) {
        state.loadedFiles[ action.payload.compressedKey ] = action.payload.loadedFile;
    }

    if ( action.type == "RESET_LOADED" ) {
        state.loadedFiles = {};
    }

    if ( action.type == "ADD_FORMAT" ) {
        state.formattedFiles[ action.payload.compressedKey ] = action.payload.formattedFile;
    }

    if ( action.type == "RESET_FORMAT" ) {
        state.formattedFiles = {};
    }

    return state;
}

export default function CodeBoxContextProvider( {children} ) {

    const [ codeBoxState, codeBoxDispatch ] = useReducer( CodeBoxReducer, initialCodeBox );

    const addLoadedFile = useCallback ( async ( file ) => {
        const compressedKey = file.route;
        if ( codeBoxState.loadedFiles[compressedKey] ) {
            return codeBoxState.loadedFiles[compressedKey];
        }

        const loadedFile = await fetchCodeBoxFile( file );
        codeBoxDispatch({
            type: "ADD_LOADED",
            payload: {
                compressedKey,
                loadedFile
            },
        }) 

        return loadedFile;
    }, [codeBoxState.loadedFiles]  )
    
    const addFormattedFile = useCallback( ( file ) => {
        const compressedKey = file.plainText;
        if ( codeBoxState.formattedFiles[compressedKey] ) {
            return codeBoxState.formattedFiles[compressedKey];
        }

        const extension = file.name.substr( file.name.lastIndexOf(".") + 1 );
        const formattedFile = formatCodeText( file.plainText, extension );
        codeBoxDispatch({
            type: "ADD_FORMAT",
            payload: {
                compressedKey,
                formattedFile
            },
        }) 

        return formattedFile; 
    }, [codeBoxState.formattedFiles] );

    function resetLoadedFile() {
        codeBoxDispatch({
            type: "RESET_LOADED",
            payload: null
        }) 
    };

    function resetFormattedFile() {
        codeBoxDispatch({
            type: "RESET_FORMAT",
            payload: null
        }) 
    };

    const ctxValue = {
        addFormattedFile,
        resetFormattedFile,
        addLoadedFile,
        resetLoadedFile,
    }

    return <CodeBoxContext.Provider value={ctxValue}>
        {children}
    </CodeBoxContext.Provider>

}