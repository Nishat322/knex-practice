/* eslint-disable indent */
'use strict';
require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

ShoppingListService.getAllItems(knexInstance)
    .then(items=> console.log(items))
    .then(()=>
        ShoppingListService.insertItem(knexInstance,{
            name: 'New Item',
            price: '12.12',
            date_added: new Date(),
            checked: false,
            category: 'Snack',
        })
    )
    .then(newItem => {
        console.log(newItem);
        return ShoppingListService.updateAnItem(
            knexInstance,
            newItem.id,
            {name: 'Updated Name'}
        )
        .then(()=> ShoppingListService.getById(knexInstance,newItem.id));
    })
    .then(item => {
        console.log(item);
        return ShoppingListService.deleteItem(knexInstance, item.id);
    });
