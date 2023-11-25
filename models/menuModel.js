"use strict";

import { sequelize_instance } from "../../config/db_shared.js";
import { DataTypes, Model } from "sequelize";

class MenuModel extends Model {
    static async createMenuItem(body) {
        const newMenuItem = MenuModel.build(body);
        return await newMenuItem.save();
    }

    static async findByItemID(itemID) {
        const menuItem = await MenuModel.findOne({
            where: { itemID: itemID }
        });
        return menuItem;
    }

    static async findByCategory(category) {
        const menuItems = await MenuModel.findAll({
            where: { category: category }
        });
        return menuItems;
    }

    static async updateMenuItem(itemID, updatedValues) {
        const [updatedRowsCount, updatedRows] = await MenuModel.update(updatedValues, {
            where: { itemID: itemID },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteMenuItem(itemID) {
        const deletedRowsCount = await MenuModel.destroy({
            where: { itemID: itemID }
        });
        return deletedRowsCount;
    }
}

MenuModel.init({
    itemID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },

    //APPETIZERS, drink 
    category: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },

    category2: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },

    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
}, {
    sequelize: sequelize_instance,
    timestamps: false,
    modelName: "menu"
})



export { MenuModel as model }
