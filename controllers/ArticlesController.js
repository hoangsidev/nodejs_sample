const models = require('../models/Models.js');
const Articles = models.Articles();

module.exports = (app, io) => {
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/articles', (req, res) => {
        Articles.find({}, (err, result) => {
            res.render('index', {
                data_articles: JSON.stringify(result)
            });
        });
    });
    app.get('/articles/view/:id', (req, res) => {
        var id = req.params.id;
        Articles.find({ _id: id }, (err, result) => {
            res.json(result);
        });
    });
    app.get('/articles/create', (req, res) => {
        res.render('create');
    });
    app.post('/articles/create', (req, res) => {
        var arr_article = new Object();
        arr_article.title = req.body.title ? req.body.title : null;
        arr_article.content = req.body.content ? req.body.content : null;
        arr_article.tags = req.body.tags ? req.body.tags : null;
        arr_article.created_at = new Date();
        Articles.create(arr_article, (err, result) => {
            res.redirect('/articles')
        });
    });
    app.put('/articles/update', (req, res) => {
        var arr_article = new Object();
        arr_article.title = req.body.title ? req.body.title : null;
        arr_article.content = req.body.content ? req.body.content : null;
        arr_article.tags = req.body.tags ? req.body.tags : null;
        arr_article.updated_at = new Date();
        Articles.create(arr_article, (err, result) => {
            console.log(result);
        });
    });
    app.post('/articles/delete', (req, res) => {
        var id = req.body.id;
        Articles.deleteOne({ _id: id }, (err, result) => {
            res.redirect('/articles')
        });
    });

    // io.on('connection', (socket) => {
    //     socket.on('sample', (sample) => {
    //         socket.emit('sample', sample);
    //     });

    //     socket.on('disconnect', () => {
    //         io.sockets.emit('sample', sample);
    //     });
    // });
}