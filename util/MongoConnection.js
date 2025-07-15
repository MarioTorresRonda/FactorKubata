import { DEBUG, log } from "./logs";
import { keys, readSecrets } from "./Secrets";
import { MongoClient } from "mongodb";

export default class MongoConnection {
    static instance;

    static async getInstance() {
        if (!MongoConnection.instance) {
            MongoConnection.instance = await MongoConnection.createInstance();
        }
        return MongoConnection.instance;
    }

    static async createInstance() {
        log( DEBUG, "Nueva conexion Client" )
        var connection = readSecrets( keys.DB );
        return await MongoClient.connect( connection );
    }
}