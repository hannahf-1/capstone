"use strict";

import Joi from "joi";

export class MenuManagementSchemas {

    static #get_schema = {

        query: Joi.object().keys({
            filter: Joi.string(),
            includeItems: Joi.boolean().default(false),
        }).unknown(),

        body: Joi.object().keys({
            filter: Joi.string(),
            includeItems: Joi.boolean().default(false),
        }).unknown(),
    }
    // ----------------------------------------------
    // path options do not require name or id because its provided in path itself
    static #post_category = {
        name: Joi.string().required(),
        description: Joi.string().optional().allow(null),
    }

    static #post_category_path = {
        description: Joi.string().optional().allow(null),
    }

    static #post_item = {
        name: Joi.string().required(),
        description: Joi.string().optional().allow(null),
        price: Joi.number().required(), //works with floats
        category: Joi.string().optional().allow(null),
    }

    static #post_item_path = {
        description: Joi.string().optional().allow(null),
        price: Joi.number().required(), //works with floats
        category: Joi.string().optional().allow(null),
    }

    // ----------------------------------------------
    static #put_item = {
        id: Joi.number().required(),
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number().required(),
    }

    static #put_category = {
        name: Joi.string().required(),
        //set or after object.keys
        new_name: Joi.string(),
        description: Joi.string(),
    }
    // ----------------------------------------------

    static #delete_schema = () => {

        let cats = [
            Joi.object().keys({ name: Joi.string() }),
            Joi.array().items(Joi.object().keys({ name: Joi.string() }))
        ]

        let items = [
            Joi.object().keys({ id: Joi.number() }),
            Joi.array().items(Joi.object().keys({ id: Joi.number() }))
        ]

        return {
            body: Joi.object().keys({
                category: Joi.alternatives().try(...cats),
                categories: Joi.alternatives().try(...cats),
                item: Joi.alternatives().try(...items),
                items: Joi.alternatives().try(...items),
            }),

            query: Joi.object().keys({
                name: Joi.string(), // name for category
                id: Joi.number(),   // id for item
            }).or("name", "id")
        }
    }

    static #path_validator = {
        params: Joi.object().keys({
            itemID: Joi.number(),
            category: Joi.string(),
            itemName: Joi.string(),
        })
    }
    // used to validate anything using params
    static get path_schema() {
        return MenuManagementSchemas.#path_validator;
    }

    static get get_schema() {
        return MenuManagementSchemas.#get_schema;
    }

    //only body for now because it will get too complicated
    static get post_schema() {
        return {
            body: Joi.object().keys({
                category: Joi.alternatives(
                    Joi.object().keys(MenuManagementSchemas.#post_category),
                    Joi.array().items(Joi.object().keys(MenuManagementSchemas.#post_category))
                ),

                item: Joi.alternatives(
                    Joi.object().keys(MenuManagementSchemas.#post_item),
                    Joi.array().items(Joi.object().keys(MenuManagementSchemas.#post_item))
                )
            }),
        }
    }

    static get post_schema_path() {
        return {
            body: Joi.object().keys({
                category: Joi.object().keys(MenuManagementSchemas.#post_category_path),
                item: Joi.object().keys(MenuManagementSchemas.#post_item_path),
            }),

            query: Joi.object().keys(MenuManagementSchemas.#post_item_path)
        }
    }


    static get put_schema() {
        return {
            body: Joi.object().keys({
                category: Joi.object().keys(MenuManagementSchemas.#put_category).or("new_name", "description"),
                item: Joi.object().keys(MenuManagementSchemas.#put_item),
            })
        }
    }

    static get delete_schema() {
        return MenuManagementSchemas.#delete_schema();
    }

}

export default MenuManagementSchemas