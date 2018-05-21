var Models = require('./Models.js');
var ConnectMongoDB = Models.ConnectMongoDB();

var ArticlesModel = {
    Articles: (req, res) => {
        const articlesSchema = new ConnectMongoDB.Schema({
            title: String,
            content: String,
            tags: [],
            created_at: String,
            updated_at: String
        });
        const m_articles = ConnectMongoDB.model('articles', articlesSchema);
        return m_articles;
    }
}
module.exports = ArticlesModel;