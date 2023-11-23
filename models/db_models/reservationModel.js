"use strict";

import { sequelize_instance } from "../db_shared.js";
import { DataTypes, Model, UUIDV4 } from "sequelize";

class ReservationModel extends Model { 
    static async createReservation(data) {
        const reservation = ReservationModel.build(data);
        return await reservation.save();
    }

    static async findReservationByUUID(reservation_id) {
        return await ReservationModel.findByPk(reservation_id);
    }

    static async updateReservation(reservation_id, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ReservationModel.update(updatedValues, {
            where: { reservation_id: reservation_id },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteReservation(reservation_id) {
        const deletedRowsCount = await ReservationModel.destroy({
            where: { reservation_id: reservation_id }
        });
        return deletedRowsCount;
    }

    // Add more functions as needed
}

ReservationModel.init(
    {
        reservation_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
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

        event_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        occasion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        other: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        services: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        special_request: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize: sequelize_instance,
        timestamps: true,
        modelName: "reservation", // Optional: Sequelize will automatically use the model name in plural form, but you can specify it explicitly.
    }
);

export { ReservationModel as model };
