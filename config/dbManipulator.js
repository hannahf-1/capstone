//will be responsible for manipulating the
"use strict";

import * as db_instance from "./maria_db.js"
import { model as UserModel } from "../models/db_models/userAccountModel.js"
import { model as MenuModel } from "../models/db_models/menuModel.js"
import { model as ReservationModel } from "../models/db_models/reservationModel.js"
import { model as review } from '../models/db_models/reviewModel.js'
import { model as app } from '../models/db_models/application_models/applicationPersonalModel.js'
import { model as app_ref  } from '../models/db_models/application_models/applicationReferencesModel.js'
import { model as app_edu } from '../models/db_models/application_models/applicationEducationHistoryModel.js'
import { model as app_work } from '../models/db_models/application_models/applicationEmploymentHistoryModel.js'


//DbManipulator will automatically get the shared 
export default class DbManipulator {

    static seq = db_instance.sequalize; 

    static #sequelize = new Sequelize("miguelsDB_dev", "miguelsDB_access", "Yc6N3BYWjCZt",
        {
            host: "csdevweb.vps.webdock.cloud",
            dialect: "mariadb"
        }
    );

    get sequelize() {
        return DbManipulator.#sequelize;
    }

    static async connect() {
        return await db_instance.connect();
    }
    
    static async initializeTables(...model_list) {

    }

    static async createNewUser(data) {
        return await UserModel.createNewUser(data);
    }

    static async createReservation(data) {
        return await ReservationModel.createReservation(data);
    }

    static async createReview(data) {
        return await review.createReview(data);
    }
}
