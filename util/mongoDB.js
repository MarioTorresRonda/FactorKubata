import MongoDatabases from "./MongoDatabases";

let cachedDb = null;

export async function getCollection( collectionName ) {
    const database = await MongoDatabases.getDatabase("factorKubata");

    const collection = database.collection(collectionName);
    return collection;
}

export async function createCollection( collection ) {
    const database = await MongoDatabases.getDatabase("factorKubata");
    await database.createCollection( collection )

    const newCollection = database.collection(collection);
    return newCollection;
}