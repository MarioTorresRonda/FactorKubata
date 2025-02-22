import messages_es from "@/data/messages_es";

export async function getAsyncLocale( locale ) {
    const messages = await import( "@/data/messages_"+locale );
    if ( !messages ) {
        return messages_es;
    }
    return messages.default;
}

export function getDefaultLocale() {
    return messages_es;
}

export function getLocaleBlog( locale ) {
    if ( locale == "es" ) {
        return messages_es;
    }else{
        return messages_es;
    }
}

export function getCodeFromArray( locale, codeArray ) {

    try{
        let localePointer = locale;
        codeArray.forEach(code => {
            localePointer = localePointer[code];
        });
        return localePointer;
    }catch(e) {
        return codeArray.join('.');
    }
    
}