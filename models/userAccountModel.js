"use strict";

import mariadb from "../config/db_shared.js" //contains sequalize instance
import { DataTypes, Model } from "sequelize"

class UserModel extends Model {
    //middleware check will ensure that body will proper objects
    static async createNewUser(body) {

        if (await UserModel.doesUsernameAlreadyExist(body.username))
            throw new Error("Username Already Exists");

        if (await UserModel.doesEmailAlreadyExist(body.email))
            throw new Error("Email Already Exists")

        const newUser = UserModel.build(body)
        return await newUser.save()
    }

    static async updateUser(user_id, updatedValues) {
        const { updatedRowCount, updatedRows } = await UserModel.update(updatedValues, {
            where: {
                user_id: user_id,
            }
        })

        return {updatedRowCount, updatedRows}
    }

    static async doesUsernameAlreadyExist(username) {
        return !!(await UserModel.findOne({ where: { username: username } }))
    }


    static async doesEmailAlreadyExist(email) {
        return !!(await UserModel.findOne({ where: { email: email } }))
    }

    static async findByUID(uid) {
        //should only return 1 despite being users
        const user = await UserModel.findOne({
            where: { user_id: uid }
        })
        return user;
    }

    static async findByUsername(username) {
        //should only return 1 despite being users
        const user = await UserModel.findOne({
            where: { username: username }
        })
        return user;
    }

    static async findByEmail(email) {
        //should only return 1 despite being users
        const user = await UserModel.findAll({
            where: { email: email }
        })
        return user;
    }

    static async findOneByQuery(sequalize_query, inclusive = true) {
        return async(inclusive ? UserModel.findAll(sequalize_query) : UserModel.findOne(sequalize_query));
    }

}

UserModel.init(
    {
        user_id: {
            type: DataTypes.UUID,
            allowNull: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        first_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        last_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        /* //day that the account was created within the database
        insertion_date: {
            type: DataTypes.DATE,
            allowNull: true, //
        },

        //day that the account was created using the website 
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        } */

    }, {
    sequelize: mariadb.sequelize,
    timestamps: true,
    modelName: 'users',
})

export { UserModel as model }