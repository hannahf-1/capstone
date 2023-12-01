/* 
    contains functions for connecting and initializiing selected databse.
    database params and credentials should be set in environmentally using expots in ._shrc or windows system properties 
 */
"use strict";

import { Sequelize } from 'sequelize';
import env_config from './env_config.js';
import logger from './logger.js';

export default class mariadb_connector {

    static #sequelize = new Sequelize(
        env_config.DB_NAME,
        env_config.DB_USER,
        env_config.DB_PASS,
        {
            host: env_config.DB_HOST,
            port: env_config.DB_PORT || 3306,
            dialect: env_config.DB_DIALECT || "mariadb",
            logging: msg => logger.debug(msg),
            dialectOptions: {
                requestTimeout: 30000,
            }
        },
        

    );

    static get sequelize() {
        return mariadb_connector.#sequelize;
    }

    static async check_connection() {
        logger.info(`Checking '${this.#sequelize.getDialect()}' Connection: ${this.#sequelize.config.host}`);
        return await mariadb_connector.#sequelize.authenticate().then(() => {
            logger.info(`Connection established to ${env_config.DB_DIALECT} database`);
        }).catch((err) => {
            logger.error(">Could not establish a connection: ")
            logger.error(err.stack);
        })

    };

    static async disconnect() {
        return mariadb_connector.#sequelize.close();
    }

    //initializes sequelize class model 
    static async initializeTables(destructive = false, ...models) {

        if (env_config.isProduction())
        {
            logger.warn("initializeTables is disabled in Production")
            return;
        }

        if(destructive) logger.warn("Executing destructive table queries")

        logger.debug("Starting DB sync");

        //logger.info(models)
        for (const model of models) {
            await model.sync({
                force: destructive,
                alter: true,
                match: /_dev$/
            })
                .then(() => {
                    logger.info(`\tAdded table '${model.tableName}'`);
                })
                .catch((err) => {
                    logger.error("\tAn err has occured: \n", err);
                })
        };
        logger.debug("Sync Complete")
    }

    static async dropTables(...models) {
        if (env_config.isProduction())
        {
            logger.warn("dropTales is disabled in Production")
            return;
        }

        logger.debug("Dropping Table(s)")

        for (const model of models) {
            await model.drop().catch((err) => {
                logger.error(`\tError dropping table '${model.tableName}'\n`, err)
            })
        }

        const drop_list = models.map((model) => model.modelName)
        logger.info(`Dropped Table(s) ${drop_list}`)
    }
}