var mongoose = require('../../config/database.js');

var users_schema = new mongoose.Schema({
    username: String,
    email: String,
    display_name: String,
    password: String,
    thumbnail: String,
    key_password_reset : String,
    active: String,
    role: String,
    created_at: String,
    updated_at: String
});
module.exports = mongoose.model('users', users_schema); 