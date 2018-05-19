const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/posts');
const db_connect = mongoose.connection;
db_connect.on('err', console.error.bind(console, 'connect err'))
db_connect.once('open', () => { console.log('Connected mongodb !!!!')});
module.exports = {
    Articles: () => {
        const articlesSchema = new mongoose.Schema({
            title: String,
            content: String,
            tags: [],
            created_at: String,
            updated_at: String
        });
        const Articles = mongoose.model('articles', articlesSchema);
        return Articles;
    }
}