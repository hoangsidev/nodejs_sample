/* https://hoangsi.com/ */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const methodOverride = require('method-override')
const io = require('socket.io')(server);
server.listen(process.env.PORT || 3000, () => {
    console.log('Server runing with port 3000 !!!!');
});
/* --------------------------------------------------------------------------------------- */
const bodyParser = require('body-parser'); // phải dùng cái này mới dùng được Post
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(methodOverride('_method'));
/* --------------------------------------------------------------------------------------- */
app.use(express.static('./assets')); // thư mục public chứa hình, css,...
app.set('view engine', 'ejs'); // đặt template engine là EJS
app.set('views', './views'); // trỏ vào thư mục view để chứa các file template
/* --------------------------------------------------------------------------------------- */
var ArticlesController = require('./controllers/ArticlesController.js');
/* --------------------------------------------------------------------------------------- */
// RESTful API
app.route('/api/articles')
    .get(ArticlesController.api_articles)
    .post(ArticlesController.api_insert)
app.route('/api/articles/:id')
    .get(ArticlesController.api_edit)
    .post()
    .put(ArticlesController.api_update)
    .delete(ArticlesController.api_delete);
// End RESTful API

// CURD
app.route('/articles')
    .get(ArticlesController.articles)
app.route('/articles/create')
    .get(ArticlesController.create)
    .post(ArticlesController.insert)
app.route('/articles/edit/:id')
    .get(ArticlesController.edit)
app.route('/articles/update')
    .put(ArticlesController.update)
app.route('/articles/delete')
    .delete(ArticlesController.delete)
// End CURD
/* --------------------------------------------------------------------------------------- */
// io.on('connection', (socket) => {
//     console.log(socket.id);
//     socket.on('sample', (sample) => {
//         socket.emit('sample', sample);
//     });

//     socket.on('disconnect', () => {
//         io.sockets.emit('sample', sample);
//     });
// });
/* --------------------------------------------------------------------------------------- */