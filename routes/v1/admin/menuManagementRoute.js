"use strict";

import { Router } from 'express';
//import { authenticate } from '../../../config/passport.js';
import validate from '../../../middlewares/validate.js';
import menuVals from '../../../validationSchemas/menuManagementSchemas.js';
import catchAsync from '../../../utils/catchAsync.js';
import menuController from '../../../controllers/menuManagementController.js';


/* TODO: ### functions ###
    - [ ] implement query functions for analytics
    - [ ] reorganize routes, currently it's a mess
 */

const router = Router();

router.get("/categories", validate(menuVals.get_schema), catchAsync(menuController.getCategories));                 // ? filter = (breakfast | happy hours | drinks | etc) | includeItems = (*true* | false) - might not after all.
router.get("/items", validate(menuVals.get_schema), catchAsync(menuController.getItems))

router.get("/category/:category", validate(menuVals.path_schema, menuVals.get_schema), catchAsync(menuController.getCategory))            // equivalent to /categories?filter=category.
router.get("/item/:itemID", validate(menuVals.path_schema, menuVals.get_schema))                  // equivalent to /categories?filter=category&includeItems=true

//creation - body only
router.post("/categories", validate(menuVals.post_schema));                 // bulk creation, requires body containing category name and description
router.post("/items", validate(menuVals.post_schema))                       // bulk creation, requires body containing item name and price mandatory, description and category optional

router.post("/category/:category", validate(menuVals.path_schema, menuVals.post_schema_path))     // no body or query atm
router.post("/category/:category/item", validate(menuVals.path_schema, menuVals.post_schema_path))     // no body or query atm));

//modification, only one at a time, body only
router.put("/category", validate(menuVals.put_schema))                                                  // update category info, can take an array of items    
router.put("/item", validate(menuVals.put_schema))

router.delete("/categories", validate(menuVals.delete_schema));              // bulk deletion, required body
router.delete("/items", validate(menuVals.delete_schema));                                        // requires body

router.delete("/category/:category", validate(menuVals.path_schema));                                  // delete a category
router.delete("/item/:itemID", validate(menuVals.path_schema, menuVals.delete_schema));                                  // delete an item in a category

router.put("/undo");

export default router;