/* eslint-disable indent */
'use strict';
require('dotenv').config();
const knex = require('knex');
const ArticlesService = require('./articles-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

ArticlesService.getAllArticles(knexInstance)
    .then(articles => console.log('got all articles:', articles))
    .then(() =>
        ArticlesService.insertArticle(knexInstance, {
            title: 'New Title',
            content: 'New Content',
            date_published: new Date(),
        })
    )
    .then(newArticle => {
        console.log('insertion of new article:' ,newArticle);
        return ArticlesService.updateArticle(
            knexInstance,
            newArticle.id,
            {title: 'Updated title'}
        )
        .then(() => ArticlesService.getById(knexInstance, newArticle.id));
    })
    .then(article => {
        console.log('before deletion:', article);
        return ArticlesService.deleteArticle(knexInstance, article.id);
    });