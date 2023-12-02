"use strict";

import { DataTypes, Model } from "sequelize";
import mariadb_connector from "../../config/maria_db.js";
import { model as ApplicationPrimaryModel } from "./primaryModel.js";

class ApplicationEducationHistoryModel extends Model {
    static async createWithFK(application_fk_id, data) {
        data.application_fk_id = application_fk_id;
        return await ApplicationEducationHistoryModel.create(data);


        /* const educationHistory = ApplicationEducationHistoryModel.build(data);
        return await educationHistory.save(); */
    }

    // TODO: delete and refactor
    static async findByID(id) {
        return await ApplicationEducationHistoryModel.findByPk(id);
    }

    static async findAllByAppID(application_fk_id) {
        return await ApplicationEducationHistoryModel.findAll({
            where: { application_fk_id: application_fk_id }
        });
    }

    static async updateEducationHistory(id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ApplicationEducationHistoryModel.update(updatedValues, {
            where: { id: id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteEducationHistory(id) {
        const deletedRowsCount = await ApplicationEducationHistoryModel.destroy({
            where: { id: id }
        });
        return deletedRowsCount;
    }

}

ApplicationEducationHistoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        school_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        years_attended: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        school_location: {
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
        degree_received: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        major: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize: mariadb_connector.sequelize,
        timestamps: false,
        modelName: "application_education_history",
    }
);

//redundant since we already set the foreign_key application_fk_id in the model initialization but still good for clarity

ApplicationEducationHistoryModel.belongsTo(ApplicationPrimaryModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
export { ApplicationEducationHistoryModel as model };
