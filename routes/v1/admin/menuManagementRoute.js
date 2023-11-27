"use strict";

import { Router } from 'express';

/* Todo: ### functions ###
    - [ ] implement query functions for analytics
    - [ ] reorganize routes, currently it's a mess
 */

const router = Router();

router.get("categories");               // ? filter = (breakfast | happy hours | drinks | etc) | includeItems = (*true* | false)
router.get(":category")                 // equivalent to /categories?filter=category.
router.get(":category/item/:itemID");   // specific item in a category

router.post("categories");              // create a new category, can take an array of items
router.post(":category/item/:itemID");  // create a new item in a category

router.put("categories")                // update category info, can take an array of items    
router.put(":category/item/:itemID");   // update item info

router.delete("categories");            // delete a category, all items inside the list will be deleted.
router.delete(":category/item/:itemID");// delete an item in a category

export default router;