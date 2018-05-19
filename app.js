/* https://hoangsi.com/ */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(process.env.PORT || 3000, () => {
    console.log('Server runing with port 3000 !!!!');
});
/* --------------------------------------------------------------------------------------- */
const bodyParser = require('body-parser'); // phải dùng cái này mới dùng được Post
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/* --------------------------------------------------------------------------------------- */
app.use(express.static('./assets')); // thư mục public chứa hình, css,...
app.set('view engine', 'ejs'); // đặt template engine là EJS
app.set('views', './views'); // trỏ vào thư mục view để chứa các file template
/* --------------------------------------------------------------------------------------- */
require('./controllers/ArticlesController.js')(app, io);
/* --------------------------------------------------------------------------------------- */