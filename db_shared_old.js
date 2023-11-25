//contains functions for connecting

"use strict";
import { Sequelize } from 'sequelize';


const mariadb = () => {

    const sequelize = new Sequelize("miguelsDB_dev", "miguelsDB_access", "Yc6N3BYWjCZt",
        {
            host: "csdevweb.vps.webdock.cloud",
            dialect: "mariadb"
        }
    );

    async function connect() {
        console.log(">Connecting to DB ----");
        return await sequelize.authenticate().then(() => {
            console.log(">connection established");
        }).catch((err) => {
            console.log(">Could not establish a connection: ", err);
        })
    };

    function disconnect() {
        sequelize.close();
    }

    async function dropTables(...models) {
        console.log("---- Dropping Table(s) ----")

        for (const model of models) {
            await model.drop()
                .catch((err) => {
                    console.error(`\tError dropping table '${model.tableName}'\n`, err)
                })
        }
    }

    //initializes sequelize class model 
    async function initializeTables(...models) {
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

    connect();
}

export default mariadb;