"use strict";

import { DataTypes, Model } from "sequelize";
import { model as ApplicationPrimaryModel } from "./primaryModel.js";
import mariadb_connector from "../../config/maria_db.js";

class ApplicationReferencesModel extends Model {
    static async createReference(application_fk_id, data) {
        data.application_fk_id = application_fk_id;
        const reference = ApplicationReferencesModel.build(data);
        return await reference.save();
    }

    static async findReferenceById(id) {
        return await ApplicationReferencesModel.findByPk(id);
    }

    static async findAllReferencesByApplicationId(application_fk_id) {
        return await ApplicationReferencesModel.findAll({
            where: { application_fk_id: application_fk_id }
        });
    }

    static async updateReference(id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ApplicationReferencesModel.update(updatedValues, {
            where: { id: id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteReference(id) {
        const deletedRowsCount = await ApplicationReferencesModel.destroy({
            where: { id: id }
        });
        return deletedRowsCount;
    }

}

ApplicationReferencesModel.init(
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
        reference_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize: mariadb_connector.sequelize,
        timestamps: false,
        modelName: "application_references",
    }

);

//redundant since we already set the foreign_key application_fk_id in the model initialization but still good for clarity
//ApplicationPrimaryModel.hasMany(ApplicationReferencesModel);
ApplicationReferencesModel.belongsTo(ApplicationPrimaryModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})

export { ApplicationReferencesModel as model };

