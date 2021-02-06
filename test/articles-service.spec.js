/* eslint-disable indent */
'use strict';
require('dotenv').config();
const { expect } = require('chai');
const ArticlesService = require('../src/articles-service');
const knex = require('knex');

describe('Articles service object', function(){
    let db;

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });
    
    describe('getAllArticles()', () => {
        it('resolves all articles from \'blogful_articles\' table', () => {

        });
    });
});