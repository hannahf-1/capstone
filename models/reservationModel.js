"use strict";

import mariadb_connector from "../config/maria_db.js";
import { DataTypes, Model } from "sequelize";

class ReservationModel extends Model {
    static async createReservation(data) {
        const reservation = ReservationModel.build(data);
        return await reservation.save();
    }

    static async findAllReservations(params = null, omit_sensitive = true) {
        return await ReservationModel.findAll({
            ...(omit_sensitive && { attributes: ["id", "date_start", "date_end", "occasion"] }),
            ...params
        })
    }

    static async findReservationByUUID(reservation_id) {
        return await ReservationModel.findByPk(reservation_id);
    }

    static async updateReservation(reservation_id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ReservationModel.update(updatedValues, {
            where: { id: reservation_id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteReservation(reservation_id) {
        const deletedRowsCount = await ReservationModel.destroy({
            where: { id: reservation_id }
        });
        return deletedRowsCount;
    }

    // Add more functions as needed
}

ReservationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },

        occasion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        phone_number: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        method_of_contact: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        date_start: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        date_end: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        additional_information: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        services: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        special_request: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    },
    {
        sequelize: mariadb_connector.sequelize,
        timestamps: true,
        modelName: "reservation", // Optional: Sequelize will automatically use the model name in plural form, but you can specify it explicitly.
    }
);

export { ReservationModel as model };
