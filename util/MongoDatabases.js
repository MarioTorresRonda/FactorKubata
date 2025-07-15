import { DEBUG, log } from "./logs";
import MongoConnection from "./MongoConnection";

export default class MongoDatabases {
    static databasesInstances = {};

    static async getDatabase( databaseName ) {
        const exists = MongoDatabases.databasesInstances[databaseName];
        if ( !exists ) {
            await MongoDatabases.createDatabaseInstance( databaseName );
        }
        return MongoDatabases.databasesInstances[databaseName];
    }

    static async createDatabaseInstance( databaseName ) {
        log( DEBUG, "Nueva conexion Database: " + databaseName );
        const client = await MongoConnection.getInstance();
        MongoDatabases.databasesInstances[databaseName] = client.db( databaseName );
        return MongoDatabases.databasesInstances[databaseName];
    }
}