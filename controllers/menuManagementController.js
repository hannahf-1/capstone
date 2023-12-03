"use strict";

import { model as MenuItems } from "../models/menu_Models/menuModel.js";
import { model as Categories } from "../models/menu_Models/categoryModel.js";

export class MenuManagementController {

    static getCategories = async (req, res, next) => {
        const categories = await Categories.findAll()
        res.send(JSON.stringify(categories));
    }

    static getItems = async (req, res, next) => {
        const items = await MenuItems.findAll()
        res.send(JSON.stringify(items));
    }

    static getCategory = async (req, res, next) => {
        let items = null

        if (req.params) {
            if (req.params.category === "all")
                items = await Categories.findAll()
            else
                items = await Categories.findByName(req.params.category)
        }


        if (req.params.category == "all") {
            const items = await MenuItems.findAll()
            return res.send(JSON.stringify(items));
        }



        const category = await Categories.findByCategory(req.params.category)
        await Categories.findby
        res.send(JSON.stringify(category));
    }

    static getItem = async (req, res, next) => {
        const item = await MenuItems.findByItemID(req.params.itemID)
        res.send(JSON.stringify(item));
    }


}

export default MenuManagementController;