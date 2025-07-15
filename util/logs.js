import { createWriteStream, existsSync  } from 'node:fs' 
import { keys, readSecrets } from './Secrets';

export const DEBUG = console.debug;
export const NOTICE = console.log;
export const WARNING = console.warn;
export const ERROR = console.error;

let stream;

export function log( type, ...message ) {
    type( ...message );
    if ( readSecrets( keys.logs ) ) {
        const fileName = `${readSecrets(keys.logRoute)}main_${formatDay()}.log`
        if ( !stream ) {
            if ( !existsSync(fileName) ) {
                
            }
            stream = createWriteStream(fileName, {flags:'a'});
        }
        stream.write( formatMessage( type, message.join(" ") ) );
    }
}

function formatMessage(type, ...message ) {
    return `${formatTime()} ${formatType(type)} ${message} \n`
}

function formatType( type ) {
    let typeText;
    if ( type == DEBUG ) {
        return 'DEV'
    }
    if ( type == NOTICE ) {
        return ''
    }
    if ( type == WARNING ) {
        return 'WARN'
    }
    if ( type == ERROR ) {
        return 'ERR'
    }
}

function formatDay() {
    const date = new Date();
    return `${date.getFullYear()}_${fillNumbers( date.getMonth() )}_${fillNumbers( date.getDate() )}`
}

function formatTime() {
    const date = new Date();
    return `${fillNumbers( date.getHours() )}:${fillNumbers( date.getMinutes() )}:${fillNumbers( date.getSeconds() )}:${fillNumbers( date.getMilliseconds(), 4 )}`
}

function fillNumbers( num, digits ) {
    if ( !digits ) {
        digits = 2;
    }
    const fill = digits - num.toString().length;
    let fillText = "";
    for (let i = 0; i < fill; i++) {
        fillText+="0";
    }
    return fillText + num
}
 