"use strict";

import { DataTypes, Model } from "sequelize";
import mariadb_connector from "../../config/maria_db.js";

class ApplicationPrimaryModel extends Model {
    static async createApplicationPersonal(data) {
        ApplicationPrimaryModel.create(data);
    }

    static async findById(application_id) {
        return await ApplicationPrimaryModel.findByPk(application_id);
    }

    static async updateApp(application_id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ApplicationPrimaryModel.update(updatedValues, {
            where: { id: application_id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }
}

ApplicationPrimaryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            //allowNull: false,
            primaryKey: true,
        },
        
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        middle_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        street_address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        city: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },

        state_: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },

        zip: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        home_phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },

        cell_phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        social_security: {
            type: DataTypes.STRING(12),
            allowNull: true,
        },

        us_citizen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        convicted_felony: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        drug_test: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize: mariadb_connector.sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "application_primary",
    }
);

export { ApplicationPrimaryModel as model };
