var db = require('../../config/database.js');
var mongoose = db.mongodb();

var articles_model = {
    articles: () => {
        return mongoose.model('articles',
            mongoose.Schema({
                title: String,
                content: String,
                tags: [],
                created_at: String,
                updated_at: String
            })
        );
    }
}
module.exports = articles_model;