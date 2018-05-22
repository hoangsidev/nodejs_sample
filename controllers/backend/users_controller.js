var m_users = require('../../models/backend/users_model.js');

var users_controller = {
    form_signin: (req, res) => {
        res.render('backend/users/signin.ejs');
    },
    signin: (req, res) => {

    },
    form_signup: (req, res) => {
        res.render('backend/users/signup.ejs');
    },
    signup: (req, res) => {
        var arr_data = new Object();
        arr_data.username = req.body.username ? req.body.username : null;
        arr_data.email = req.body.email ? req.body.email : null;
        arr_data.display_name = req.body.display_name ? req.body.display_name : null;
        arr_data.password = req.body.password ? req.body.password : null;

        arr_data.thumbnail = req.body.thumbnail ? req.body.thumbnail : null;
        arr_data.active = 0;
        arr_data.role = 0;
        arr_data.created_at = new Date();
        m_users.create(arr_data, (err, result) => {
            res.redirect('/backend/dashboard')
        });
    },
    signout: (req, res) => {
        res.redirect('/backend/')
    }
}
module.exports = users_controller;