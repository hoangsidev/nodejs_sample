var articles_model = require('../../models/backend/articles_model.js');
var m_articles = articles_model.articles();

var articles_controller = {

    // RESTful API
    api_articles: (req, res) => {
        m_articles.find({}, (err, result) => {
            return res.json(result);
        });
    },
    api_insert: (req, res) => {
        var arr_data = new Object();
        arr_data.title = req.body.title ? req.body.title : null;
        arr_data.content = req.body.content ? req.body.content : null;
        arr_data.tags = req.body.tags ? req.body.tags : null;
        arr_data.created_at = new Date();
        m_articles.create(arr_data, (err, result) => {
            return res.json(result);
        });
    },
    api_edit: (req, res) => {
        var id = req.params.id;
        m_articles.find({ _id: id }, (err, result) => {
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
        m_articles.updateOne({ _id: id }, { $set: { arr_data } }, (err, result) => {
            return res.json(result);
        });
    },
    api_delete: (req, res) => {
        var id = req.body.id;
        m_articles.deleteOne({ _id: id }, (err, result) => {
            return res.json(result);
        });
    },
    // end RESTful API

    // CURD
    dashboard: (req, res) => {
        res.render('index');
    },
    articles: (req, res, next) => { // list all & search
        var key_search = req.query.search ? req.query.search : null;
        var per_page = 2;
        var page = req.params.page || 1;
        var page_slug = 'articles'; // khai báo slug để sử dụng lại pagination nhiều lần
        if (!key_search) {
            m_articles.find({})
                .skip((per_page * page) - per_page)
                .limit(per_page)
                .exec(function (err, result) {
                    m_articles.count().exec(function (err, count) {
                        return res.render('backend/articles', {
                            data_articles: JSON.stringify(result) ? JSON.stringify(result) : null,
                            current: page,
                            pages: Math.ceil(count / per_page),
                            page_slug: page_slug ? page_slug : null
                        });
                    });
                });
        } else { // if search

            m_articles.find({
                $or: [
                    { 'title': new RegExp('^' + key_search + '$', "i") },
                    { 'content': new RegExp('^' + key_search + '$', "i") },
                    { 'tags': new RegExp('^' + key_search + '$', "i") }
                ]
            })
                .skip((per_page * page) - per_page)
                .limit(per_page)
                .exec(function (err, result) {
                    m_articles.find({
                        $or: [
                            { 'title': new RegExp('^' + key_search + '$', "i") },
                            { 'content': new RegExp('^' + key_search + '$', "i") },
                            { 'tags': new RegExp('^' + key_search + '$', "i") }
                        ]
                    }).count().exec(function (err, count) {
                        return res.render('backend/articles', {
                            data_articles: JSON.stringify(result) ? JSON.stringify(result) : null,
                            current: page,
                            pages: Math.ceil(count / per_page),
                            page_slug: page_slug ? page_slug : null,
                            key_search: key_search ? key_search : null,
                            count_result: result.length ? result.length : null
                        });
                    });
                });
        }
    },
    create: (req, res) => {
        res.render('backend/create');
    },
    insert: (req, res) => {
        var arr_data = new Object();
        arr_data.title = req.body.title ? req.body.title : null;
        arr_data.content = req.body.content ? req.body.content : null;
        arr_data.tags = req.body.tags ? req.body.tags : null;
        arr_data.created_at = new Date();
        m_articles.create(arr_data, (err, result) => {
            res.redirect('/backend/articles/edit/' + result._id)
        });
    },
    edit: (req, res) => {
        var id = req.params.id;
        m_articles.find({ _id: id }, (err, result) => {
            return res.render('backend/edit', {
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
        m_articles.findOneAndUpdate({ _id: id }, { $set: arr_data }, (err, result) => {
            res.redirect('/backend/articles/edit/' + result._id)
        });
    },
    delete: (req, res) => {
        var id = req.body.id;
        m_articles.deleteOne({ _id: id }, (err, result) => {
            res.redirect('/backend/articles')
        });
    }
    // End CURD
}
module.exports = articles_controller;