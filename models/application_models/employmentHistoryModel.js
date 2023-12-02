"use strict";

import { DataTypes, Model } from "sequelize";
import { model as ApplicationPrimaryModel } from "./primaryModel.js"; //or {model as app..personan...}
import mariadb_connector from "../../config/maria_db.js";

class ApplicationEmploymentHistoryModel extends Model {
    static async createWithFK(application_fk_id, data) {
        data.application_fk_id = application_fk_id;
        const employmentHistory = ApplicationEmploymentHistoryModel.build(data);
        return await employmentHistory.save();
    }

    static async findByApplicationID(id) {
        return await ApplicationEmploymentHistoryModel.findAll({
            where: { application_fk_id: id }
        })
    }

    static async updateModel(id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ApplicationEmploymentHistoryModel.update(updatedValues, {
            where: { id: id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteByID(id) {
        const deletedRowsCount = await ApplicationEmploymentHistoryModel.destroy({
            where: { id: id }
        });
        return deletedRowsCount;
    }

    static async deleteByApplicationID(application_id) {
        const deletedRowsCount = await ApplicationEmploymentHistoryModel.destroy({
            where: { application_fk_id: application_id }
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
/*         application_fk_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: ApplicationPrimaryModel,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }, */
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
        sequelize: mariadb_connector.sequelize,
        timestamps: false,
        modelName: "application_employment_history",
    }
);

//redundant since we already set the foreign_key application_fk_id in the model initialization but still good for clarity
//ApplicationPrimaryModel.hasMany(ApplicationEmploymentHistoryModel);
ApplicationEmploymentHistoryModel.belongsTo(ApplicationPrimaryModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})

export { ApplicationEmploymentHistoryModel as model };
