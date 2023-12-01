"use strict";

import mariadb_connector from "../config/maria_db.js";
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
        reviewID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },

        details: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        last_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

    },
    {
        sequelize: mariadb_connector.sequelize,
        timestamps: false,
        modelName: "reviews",
    }
);

export { ReviewModel as model };
