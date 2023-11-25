//contains functions for connecting

"use strict";
import { Sequelize } from 'sequelize';


export default class mariadb_connector {

    static #sequelize = new Sequelize("miguelsDB_dev", "miguelsDB_access", "Yc6N3BYWjCZt",
        {
            host: "csdevweb.vps.webdock.cloud",
            dialect: "mariadb"
        }
    );

    static get sequelize() {
        return mariadb_connector.#sequelize;
    }

    static async connect() {
        console.log(">Connecting to DB ----");
        return await mariadb_connector.#sequelize.authenticate().then(() => {
            console.log(">connection established");
        }).catch((err) => {
            console.log(">Could not establish a connection: ", err);
        })

    };

    static async disconnect() {
        return mariadb_connector.#sequelize.close();
    }

    static async dropTables(...models) {
        console.log("---- Dropping Table(s) ----")

        for (const model of models) {
            await model.drop()
                .catch((err) => {
                    console.error(`\tError dropping table '${model.tableName}'\n`, err)
                })
        }
    }

    //initializes sequelize class model 
    static async initializeTables(...models) {
        console.log("---- Starting Sync ----");

        console.log(models)
        for (const model of models) {
            await model.sync({
                force: true,
                alter: true,
                match: /_dev$/
            })
                .then(() => {
                    console.log(`\tAdded table '${model.tableName}'`);
                })
                .catch((err) => {
                    console.error("\tAn err has occured: \n", err);
                })
        };
        console.log("---- Sync Complete ----")
    }
}