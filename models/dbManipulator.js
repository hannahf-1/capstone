//will be responsible for manipulating the
"use strict";

import * as db_instance from "./db_shared.js"
import { model as UserModel } from "./db_models/userAccountModel.js"
import { model as MenuModel } from "./db_models/menuModel.js"
import { model as ReservationModel } from "./db_models/reservationModel.js"
import { model as review } from './db_models/reviewModel.js'
import { model as app } from './db_models/application_models/applicationPersonalModel.js'
import { model as app_ref  } from './db_models/application_models/applicationReferencesModel.js'
import { model as app_edu } from './db_models/application_models/applicationEducationHistoryModel.js'
import { model as app_work } from './db_models/application_models/applicationEmploymentHistoryModel.js'


//DbManipulator will automatically get the shared 
class DbManipulator {
    static async connect() {
        return await db_instance.connect();
    }
    
    static async initializeTables(...model_list) {

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
