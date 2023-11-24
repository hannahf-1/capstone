import * as db_instance from "./models/db_shared.js"
import { model as UserModel } from "./models/db_models/userAccountModel.js"
import { model as MenuModel } from "./models/db_models/menuModel.js"
import { model as ReservationModel } from "./models/db_models/reservationModel.js"
import { model as review } from './models/db_models/reviewModel.js'
import { model as app } from './models/db_models/application_models/applicationPersonalModel.js'
import { model as app_ref  } from './models/db_models/application_models/applicationReferencesModel.js'
import { model as app_edu } from './models/db_models/application_models/applicationEducationHistoryModel.js'
import { model as app_work } from './models/db_models/application_models/applicationEmploymentHistoryModel.js'

const model_list = [
    UserModel, 
    MenuModel, 
    ReservationModel,
    review,
    app,
    app_ref,
    app_edu,
    app_work
];

db_instance.connect()
db_instance.initializeTables(...model_list)


// UserModel.createNewUser({
//     username: "asfasfasfafsa",
//     password: "hasdf",
//     first_name: "afds",
//     last_name: "asf"
// })

// UserModel.findByUsername("negro")

// .then((user) =>
//     UserModel.updateUser(user.user_id, {last_name: "abcd"})
// )

// .then((obj) =>{
//     console.log(obj);
// })



//db_instance.disconnect()