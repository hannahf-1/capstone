"use strict";

import mariadb from "../config/maria_db.js"
import { model as UserModel } from "../models/userAccountModel.js"
// import { model as MenuModel } from "./models/menuModel.js"
// import { model as ReservationModel } from "./models/reservationModel.js"
// import { model as review } from './models/reviewModel.js'
// import { model as app } from './models/application_models/applicationPersonalModel.js'
// import { model as app_ref  } from './models/application_models/applicationReferencesModel.js'
// import { model as app_edu } from './models/application_models/applicationEducationHistoryModel.js'
// import { model as app_work } from './models/application_models/applicationEmploymentHistoryModel.js'

const model_list = [
    UserModel, 
    // MenuModel, 
    // ReservationModel,
    // review,
    // app,
    // app_ref,
    // app_edu,
    // app_work
];

await mariadb.connect();


await mariadb.initializeTables(...model_list)


await UserModel.createNewUser({
    username: "asfasfasfafsa",
    password: "hasdf",
    first_name: "afds",
    last_name: "asf",
    email: "yolo@gmail.com"
})

// UserModel.findByUsername("negro")

// .then((user) =>
//     UserModel.updateUser(user.user_id, {last_name: "abcd"})
// )

// .then((obj) =>{
//     console.log(obj);
// })

mariadb.disconnect()