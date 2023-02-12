'use strict'

var express = require('express');
var Article = require('../controllers/article');

//llamamos al objeto router express:
var router = express.Router();

//Rutas para los articulos

router.post('/save', Article.save);

router.get('/article', Article.getArticles);
router.delete('/delete/:id', Article.delete);

module.exports = router;
