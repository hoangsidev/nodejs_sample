var ArticlesModel = require('../models/ArticlesModel.js');
var Articles = ArticlesModel.Articles();

var ArticlesController = {

    // RESTful API
    api_articles: (req, res) => {
        Articles.find({}, (err, result) => {
            return res.json(result);
        });
    },
    api_insert: (req, res) => {
        var arr_data = new Object();
        arr_data.title = req.body.title ? req.body.title : null;
        arr_data.content = req.body.content ? req.body.content : null;
        arr_data.tags = req.body.tags ? req.body.tags : null;
        arr_data.created_at = new Date();
        Articles.create(arr_data, (err, result) => {
            return res.json(result);
        });
    },
    api_edit: (req, res) => {
        var id = req.params.id;
        Articles.find({ _id: id }, (err, result) => {
            return res.json(result);
        });
    },
    api_update: (req, res) => {
        var id = req.body.id;
        console.log(id);
        var arr_data = new Object();
        arr_data.title = req.body.title ? req.body.title : null;
        arr_data.content = req.body.content ? req.body.content : null;
        arr_data.tags = req.body.tags ? req.body.tags : null;
        arr_data.updated_at = new Date();
        Articles.updateOne({ _id: id }, { $set: { arr_data } }, (err, result) => {
            return res.json(result);
        });
    },
    api_delete: (req, res) => {
        var id = req.body.id;
        Articles.deleteOne({ _id: id }, (err, result) => {
            return res.json(result);
        });
    },
    // end RESTful API

    // CURD
    index: (req, res) => {
        res.redirect('/articles')
    },
    articles: (req, res) => {
        Articles.find({}, (err, result) => {
            return res.render('articles', {
                data_articles: JSON.stringify(result) ? JSON.stringify(result) : null
            });
        });
    },
    create: (req, res) => {
        res.render('create');
    },
    insert: (req, res) => {
        var arr_data = new Object();
        arr_data.title = req.body.title ? req.body.title : null;
        arr_data.content = req.body.content ? req.body.content : null;
        arr_data.tags = req.body.tags ? req.body.tags : null;
        arr_data.created_at = new Date();
        Articles.create(arr_data, (err, result) => {
            console.log(result);
            res.redirect('/articles')
        });
    },
    edit: (req, res) => {
        var id = req.params.id;
        Articles.find({ _id: id }, (err, result) => {
            return res.render('edit', {
                data_article: JSON.stringify(result) ? JSON.stringify(result) : null
            });
        });
    },
    update: (req, res) => {
        var id = req.body.id;
        var arr_data = new Object();
        arr_data.title = req.body.title ? req.body.title : null;
        arr_data.content = req.body.content ? req.body.content : null;
        arr_data.tags = req.body.tags ? req.body.tags : null;
        arr_data.updated_at = new Date();
        Articles.findOneAndUpdate({ _id: id }, { $set: arr_data }, (err, result) => {
            console.log(result);
            res.redirect('/articles')
        });
    },
    delete: (req, res) => {
        var id = req.body.id;
        Articles.deleteOne({ _id: id }, (err, result) => {
            res.redirect('/articles')
        });
    }

    // End CURD
}
module.exports = ArticlesController;