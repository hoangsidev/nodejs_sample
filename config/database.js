var db = {
    mongodb: () => {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://127.0.0.1:27017/posts');
        var db_connect = mongoose.connection;
        db_connect.on('err', console.error.bind(console, 'connect err'))
        db_connect.once('open', () => { console.log('Connected mongodb !!!!') });
        return mongoose;
    }
}
module.exports = db;