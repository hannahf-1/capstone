"use strict";

import { sequelize_instance } from "../../../config/db_shared.js";
import { DataTypes, Model } from "sequelize";
import { model as ApplicationPersonalModel } from "./applicationPersonalModel.js"; //or {model as app..personan...}

class ApplicationEmploymentHistoryModel extends Model {
    static async createEmploymentHistory(application_fk_id, data) {
        data.application_fk_id = application_fk_id;
        const employmentHistory = ApplicationEmploymentHistoryModel.build(data);
        return await employmentHistory.save();
    }

    static async findEmploymentHistoryById(id) {
        return await ApplicationEmploymentHistoryModel.findByPk(id);
    }

    static async findAllEmploymentHistoryByApplicationId(application_fk_id) {
        return await ApplicationEmploymentHistoryModel.findAll({
            where: { application_fk_id: application_fk_id }
        });
    }

    static async updateEmploymentHistory(id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ApplicationEmploymentHistoryModel.update(updatedValues, {
            where: { id: id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteEmploymentHistory(id) {
        const deletedRowsCount = await ApplicationEmploymentHistoryModel.destroy({
            where: { id: id }
        });
        return deletedRowsCount;
    }

}

ApplicationEmploymentHistoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        application_fk_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: ApplicationPersonalModel,
                key: 'application_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        position: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        desired_salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_available: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        employer: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dates_employed_start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dates_employed_end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        work_phone: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        pay_rate: {
            type: DataTypes.INTEGER,
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
        position_held: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        duties_performed: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        supervisor_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        reason_for_leave: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        can_contact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize_instance,
        timestamps: false,
        modelName: "application_employment_history",
    }
);

//redundant since we already set the foreign_key application_fk_id in the model initialization but still good for clarity
ApplicationPersonalModel.hasMany(ApplicationEmploymentHistoryModel);

export { ApplicationEmploymentHistoryModel as model };
