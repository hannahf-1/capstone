"use strict";

import { DataTypes, Model } from "sequelize";
import mariadb_connector from "../../config/maria_db.js";
import { model as MenuModel } from "./menuModel.js";


class CategoryModel extends Model {

    static async findByName(categoryName) {
        const category = await CategoryModel.findOne({
            where: { name: categoryName }
        });
        return category;
    }

    static async updateCategory(categoryName, updatedValues) {
        const [updatedRowsCount, updatedRows] = await CategoryModel.update(updatedValues, {
            where: { id: itemID },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteCategory(categoryName) {
        const deletedRowCount = await CategoryModel.destroy({
            where: { name: categoryName }
        })
    }
}

CategoryModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
    },
    
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
    },

    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }

}, {
    sequelize: mariadb_connector.sequelize,
    timestamps: false,
    paranoid: true,
    modelName: "categories",
})

CategoryModel.hasMany(MenuModel, {
    foreignKey: "category",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    hooks: true,
})

CategoryModel.hasMany(MenuModel, {
    foreignKey: "category2",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    //hooks: true,
})

export { CategoryModel as model }
