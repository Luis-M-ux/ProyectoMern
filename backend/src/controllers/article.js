'use strict'
var Article = require('../models/article');


//Creamos un objeto para disponer de todos los metodos de ruta que vamos a definir

var controller = {

    //Metodo para Guardar articulos
    save: (req, res) =>{
        var params = req.body;

        var article = new Article();
        //Asignamos los Valores
        article.title = params.title;
        article.content = params.content;
        article.author = params.author;
        //Guarda el articulo
        article.save((err, articleStored) =>{

            if (err || !articleStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El Articulo No se ha guardado'
                });
            }

            return res.status(200).send({
                status: 'success',
                articleStored
            });
        })
    },

    //Metosdo Para LIstar Articulos

    getArticles: (req, res) => {
        var query = Article.find({});

        query.sort('-date').exec((err, articles) =>{

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al Extraer los datos'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para Mostrar'
                });
            }
            return res.status(200).send({
                status: 'success',
                articles
            });
        })
    },

    //Metodo para Eliminar Un Articulo

    delete: (req, res) =>{
        //recibir el is¿d atraves de la url
        var articleId = req.params.id;

        Article.findOneAndDelete({_id: articleId}, (err, articleRemove) =>{

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error al eliminar Articilo'
                });
            }

            if (!articleRemove) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado el articulo a eliminar'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemove
            });
        })
    }
}

module.exports = controller;