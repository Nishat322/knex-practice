/* eslint-disable indent */
'use strict';
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

//Get all items that contain text
function itemContainingTerm(searchTerm){
    knexInstance
        .select('id', 'name', 'price','category','checked')
        .from('shopping_list')
        .where('name','ILIKE',`%${searchTerm}%`)
        .then(result => {
            console.log(result);
        });
}

itemContainingTerm('MoCk');

//Get all items paginated (6 items per page)
function paginatedItems(pageNumber){
    const itemsPerPage = 6;
    const offset = itemsPerPage * (pageNumber - 1);
    knexInstance
        .select('id', 'name', 'price', 'category', 'checked')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result);
        });
}

paginatedItems(3);

//Get all items added after a date
function getItemAfterDate(daysAgo){
    knexInstance
        .select('id','name','price','category','checked','date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result);
        });
}

getItemAfterDate(2);

//Get the total cost for each category 
function costPerCategory() {
    knexInstance
      .select('category')
      .sum('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('COST PER CATEGORY');
        console.log(result);
      });
}
  
costPerCategory();