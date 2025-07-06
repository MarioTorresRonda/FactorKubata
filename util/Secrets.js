import { readFileSync as readSync } from 'fs';

export const mongoDB = "mongodb.client";
export const password = "code.secret";
export const LoLApi = "lol.api";

export function readSecrets( secret ) {
    try{
        return readSync(`/etc/${secret}`, 'utf8');
    }catch( e ) {
        throw new Error(`Error leyendo el fichero de secretos: ${secret}  e:` + e ); 
    }
}