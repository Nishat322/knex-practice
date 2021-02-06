/* eslint-disable indent */
'use strict';
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

console.log('knex and driver installed correctly');
/*
Query equivalent 
    SELECT product_id, name, price, category
        FROM amazong_products
    WHERE name = 'Point of view gun';
    -- To check what your query looks like chain toQuery() to the end.
*/
knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({name:'Point of view gun'})
    .first() //adding this line logs out only an object while without this you still get the correct object but within an array
    .then(result => {
        console.log(result);
    });

/* 
Query equivalent to 
    SELECT product_id, name, price, category
        FROM amazong_products
    WHERE name ILIKE '%holo%'; (ILIKE is case insensitive while LIKE is case sensitive)
    LIKE/ILIKE - used to search by a pattern
    % - wildcard, for 0 or more characters
*/

function searchByProduceName(searchTerm){
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        });
}
//searchByProduceName('holo');

/*
Pagination for page one (to determine offset multiply page-1 by 10)
show ten products at a time on a single page. 
    SELECT product_id, name, price, category
        FROM amazong_products
    LIMIT 10
        OFFSET 0;
*/
function paginateProducts(page) {
    const productsPerPage = 10;
    const offset = productsPerPage * (page - 1);
    knexInstance
      .select('product_id', 'name', 'price', 'category')
      .from('amazong_products')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result);
      });
  }
  //paginateProducts(2);

/*
Filter products that have images (column is not null) 
    We cannot use image != NULL in our query because it would return every row 
    SQL NULL gets special treatment and two NULL values cannot be equivalent so we use IS NOT NULL operator 
Query 
    SELECT product_id, name, price, category, image
        FROM amazong_products
        WHERE image IS NOT NULL;  
    in knex we use .whereNotNull() method and then supply a column name
*/

function getProductsWithImages(){
    knexInstance
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result);
        });
}

//getProductsWithImages();


