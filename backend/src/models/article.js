'use strict'

//Se definen los campos para la DB

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    author: String
});

module.exports = mongoose.model('Article', ArticleSchema);