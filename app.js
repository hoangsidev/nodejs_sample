/* https://hoangsi.com/ */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const method_override = require('method-override')
const io = require('socket.io')(server);
const body_parser = require('body-parser'); // phải dùng cái này mới dùng được Post
server.listen(process.env.PORT || 3000, () => { console.log('Server runing with port 3000 !!!!'); });
/* --------------------------------------------------------------------------------------- */
app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: true })); // support encoded bodies
app.use(method_override('_method'));
app.use(express.static('./assets')); // thư mục public chứa hình, css,...
app.set('view engine', 'ejs'); // đặt template engine là EJS
app.set('views', './views'); // trỏ vào thư mục view để chứa các file template
/* --------------------------------------------------------------------------------------- */
var articles_controller = require('./controllers/backend/articles_controller.js');
var home_controller = require('./controllers/frontend/home_controller.js');
/* --------------------------------------------------------------------------------------- */
// RESTful API
app.route('/api/articles')
    .get(articles_controller.api_articles)
    .post(articles_controller.api_insert)
app.route('/api/articles/:id')
    .get(articles_controller.api_edit)
    .put(articles_controller.api_update)
    .delete(articles_controller.api_delete)
// End RESTful API

// BACKEND
app.route('/backend')
    .get(articles_controller.dashboard)

app.route('/backend/articles')
    .get(articles_controller.articles)

app.route('/backend/articles/page/:page')
    .get(articles_controller.articles)

app.route('/backend/articles/create')
    .get(articles_controller.create)
    .post(articles_controller.insert)

app.route('/backend/articles/edit/:id')
    .get(articles_controller.edit)

app.route('/backend/articles/update')
    .put(articles_controller.update)

app.route('/backend/articles/delete')
    .delete(articles_controller.delete)
// End BACKEND

// FRONTEND
app.route('/')
    .get(home_controller.index)
// End FRONTEND
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