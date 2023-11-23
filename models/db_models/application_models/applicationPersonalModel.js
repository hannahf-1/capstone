"use strict";

import { sequelize_instance } from "../../db_shared.js";
import { DataTypes, Model } from "sequelize";

class ApplicationPersonalModel extends Model {
    static async createApplicationPersonal(data) {
        const applicationPersonal = ApplicationPersonalModel.build(data);
        return await applicationPersonal.save();
    }

    static async findApplicationPersonalById(application_id) {
        return await ApplicationPersonalModel.findByPk(application_id);
    }

    static async updateApplicationPersonal(application_id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ApplicationPersonalModel.update(updatedValues, {
            where: { application_id: application_id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async findAllApplicationsPersonal() {
        return await ApplicationPersonalModel.findAll();
    }
}

ApplicationPersonalModel.init(
    {
        application_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
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
            allowNull: false,
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
            allowNull: false,
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
            allowNull: false,
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
        sequelize: sequelize_instance,
        timestamps: false,
        modelName: "application_personal",
    }
);

export { ApplicationPersonalModel as model };
