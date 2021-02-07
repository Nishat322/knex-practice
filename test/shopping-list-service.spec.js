/* eslint-disable indent */
'use strict';
require('dotenv').config();
const { expect } = require('chai');
const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List service object', function() {
    let db;
    let testItems = [
        {
            id: 1,
            name: 'Metal Straw',
            price: '12.39',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'Gum',
            price: '1.29',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            checked: false,
            category: 'Lunch'
        },
        {
            id: 3,
            name: 'Airpod',
            price: '109.21',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            checked: true,
            category: 'Main'
        },
    ];

    before(()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });

    before(() => db('shopping_list').truncate());

    afterEach(() => db('shopping_list').truncate());

    after(()=> db.destroy());

    context('Given \'shopping_list\' has data', ()=> {
        beforeEach(()=>{
            return db   
                .into('shopping_list')
                .insert(testItems);
        });

        it('getAllItems() resolves all items from \'shopping_list\' table',()=>{
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems);
                });
        });
        it('getById() resolves an item by id from \'shopping_list\' table', () => {
            const secondId = 2;
            const secondTestItem = testItems[secondId -1];
            return ShoppingListService.getById(db, secondId)
                .then(actual=>{
                    expect(actual).to.eql({
                        id: secondId,
                        name: secondTestItem.name,
                        price: secondTestItem.price,
                        date_added: secondTestItem.date_added,
                        checked: secondTestItem.checked,
                        category: secondTestItem.category,
                    });
                });
        });
        it('deleteItem() removes an item by id from \'shopping_list\' table', ()=>{
            const itemId = 2;
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems=>{[
                    {
                        id: 1,
                        name: 'Metal Straw',
                        price: '12.39',
                        date_added: new Date('2029-01-22T16:28:32.615Z'),
                        checked: false,
                        category: 'Main'
                    },
                    {
                        id: 3,
                        name: 'Airpod',
                        price: '109.21',
                        date_added: new Date('1919-12-22T16:28:32.615Z'),
                        checked: true,
                        category: 'Main'
                    },
                ];
                const expected = testItems.filter(item=> item.id !== itemId);
                expect(allItems).to.eql(expected);
                });
        });
        it('updateAnItem() updates an item from the \'shopping_list\' table', ()=>{
            const idOfItemToUpdate = 2;
            const newItemData = {
                name: 'Updated Item Name',
                price: '13.14',
                date_added: new Date(),
                checked: false,
                category: 'Main'
            };
            return ShoppingListService.updateAnItem(db, idOfItemToUpdate, newItemData)
                .then(()=> ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item=>{
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        name: newItemData.name,
                        price: newItemData.price,
                        date_added: newItemData.date_added,
                        checked: newItemData.checked,
                        category: newItemData.category,
                    });
                });
        });
    });

    context('Given \'shopping_list\' has no data', ()=>{
        it('getAllItems() resolves an empty array', ()=>{
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([]);
                });
        });
        it('insertItem() inserts a new item and resolves item with an \'id\'', ()=>{
            const newItem = {
                name: 'New Test Item',
                price: '11.11',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Breakfast',
            };
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: newItem.checked,
                        category: newItem.category,
                    });
                });
        });
    });
    

    
});