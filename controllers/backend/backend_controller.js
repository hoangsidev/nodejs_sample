var m_users = require('../../models/backend/users_model.js');

var backend_controller = {
    dashboard: (req, res) => {
        res.render('backend/dashboard');
    }
}
module.exports = backend_controller;