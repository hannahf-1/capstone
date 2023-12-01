"use strict";

import mariadb_connector from "../config/maria_db.js";
import { DataTypes, Model } from "sequelize";

class EventModel extends Model {
    static async findAllEvents(params = null) {
        return await EventModel.findAll(params);
    }

    static async findById(eventId) {
        return await EventModel.findByPk(eventId);
    }

    static async createEvent(eventData) {
        return await EventModel.create(eventData);
    }

    static async updateEvent(eventId, updatedEventData) {
        const [updatedRowsCount, updatedRows] = await EventModel.update(updatedEventData, {
            where: { id: eventId },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteEvent(eventId) {
        return await EventModel.destroy({ where: { id: eventId } });
    }
}

EventModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },

        details: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        date_start: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        date_end: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize: mariadb_connector.sequelize,
        modelName: "events",
        timestamps: true,
    }
);

export { EventModel as model };
