"use strict";

import { sequelize_instance } from "../db_shared.js";
import { DataTypes, Model } from "sequelize";

class ReviewModel extends Model {
    static async createReview(data) {
        const review = ReviewModel.build(data);
        return await review.save();
    }

    static async findReviewById(reviewID) {
        return await ReviewModel.findByPk(reviewID);
    }

    static async findAllReviews() {
        return await ReviewModel.findAll();
    }

    static async updateReview(reviewID, updatedValues) {
        const [updatedRowsCount, updatedRows] = await ReviewModel.update(updatedValues, {
            where: { ReviewID: reviewID },
            returning: true,
        });
        return { updatedRowsCount, updatedRows };
    }

    static async deleteReview(reviewID) {
        const deletedRowsCount = await ReviewModel.destroy({
            where: { ReviewID: reviewID }
        });
        return deletedRowsCount;
    }

}

ReviewModel.init(
    {
        ReviewID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        LastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        FirstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        CellPhone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        ReviewText: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize: sequelize_instance,
        timestamps: false,
        modelName: "reviews",
    }
);

export { ReviewModel as model };
