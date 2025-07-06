import { MongoClient } from "mongodb";
import { promises as fs } from 'fs';
import { mongoDB, readSecrets } from "./Secrets";

let cachedClient = null;
let cachedDb = null;

export async function mongoClientConexion() {
    if ( cachedClient == null ) {
        var conexion = readSecrets( mongoDB );
        cachedClient = await MongoClient.connect( conexion );
        console.log( "Nueva conexion creada" );
    }else{
        //console.log( "Conexion cacheada" );
    }
    return cachedClient;
}

export async function getCollection( collectionName ) {
    const client = await mongoClientConexion();

    if ( !cachedDb ) {
        cachedDb = client.db("factorKubata");
        console.log( "Nueva conexion DB" );
    }else{
        //console.log( "BD cacheada" );
    }
    
    const collection = cachedDb.collection(collectionName);
    return collection;
}

export async function createCollection( collection ) {

    const client = await mongoClientConexion();
    const db = client.db("factorKubata");
    await db.createCollection( collection )

    const userCollection = db.collection(collection);
    return userCollection;
}