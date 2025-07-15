import { readFileSync as readSync } from 'fs';

export const secrets = "factorKubata.secrets";
export const keys = { 
    password : "code", 
    logRoute: "logRoute", 
    logs : "logActive", 
    lol: "lolApi", 
    DB : "mongoDB" }

let secretsJSON; 

export function readSecrets( code ) {
    
    try{
        if ( !secretsJSON ) {
            secretsJSON = JSON.parse( readSync(`/etc/${secrets}`, 'utf8') )
        }
        return secretsJSON[code];
    }catch( e ) {
        throw new Error(`Error leyendo el codigo de secretos: ${code}  e:` + e ); 
    }
}