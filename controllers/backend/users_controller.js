var m_users = require('../../models/backend/users_model.js');
var md5 = require('md5');
var nodemailer = require('nodemailer');


var users_controller = {
    form_signin: (req, res) => {
        res.render('backend/users/signin.ejs');
    },
    signin: (username, password) => {
        m_users.findOne({
            username: username,
            password: md5(password)
        }).exec(function (err, result) {
            if (result) { console.log('Đã đăng nhập'); }
        });
    },
    form_signup: (req, res) => {
        res.render('backend/users/signup.ejs');
    },
    signup: (req, res) => {
        valid_username: (username) => {
            var re = /^[a-zA-Z0-9]+$/;
            return re.test(username);
        };
        valid_email: (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        valid_password: (password) => {
            var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            return re.test(password);
        }

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
    },
    form_password_reset: (req, res) => {
        var key_password_reset = req.query.key ? req.query.key : null;
        // console.log(key_password_reset);
        if (!key_password_reset) {
            res.render('backend/users/password_reset.ejs');
        } else {
            m_users.findOne({ // nếu key đúng mới hiện form
                key_password_reset: key_password_reset
            }).exec(function (err, result) {
                // console.log(result);
                if (result) {
                    res.render('backend/users/change_password_reset.ejs', {
                        key_password_reset: key_password_reset ? key_password_reset : null
                    });
                } else {
                    res.json('Link không hợp lệ');
                }
            });
        }
    },
    update_password_reset: (req, res) => {
        // console.log(req.query._method);
        var key_password_reset = req.query.key ? req.query.key : null;
        var password = req.body.password ? req.body.password : null;
        // console.log(key_password_reset);
        // console.log(password);
        m_users.findOneAndUpdate({ key_password_reset: key_password_reset }, { $set: { password: md5(password) } }, (err, result) => {
            // console.log(result);
            if (result) {
                // console.log('Thành công'); // sau khi đổi thành công thì đổi key_password_reset để khỏi truy cập vào link cũ
                var rand = Math.random().toString();
                m_users.findOneAndUpdate({ key_password_reset: key_password_reset }, { $set: { key_password_reset: md5(rand) } }, (err, result) => {
                    // if(result) { console.log('Đã đổi key'); }
                });
                res.redirect('/signin')
            } else {
                res.json('eeeeeeeee')
            }
        });

    },
    password_reset: (req, res) => {
        var email = req.body.email ? req.body.email : null;
        m_users.findOne({ email: email }).exec(function (err, result) {
            // console.log(result);
            if (result) {
                var rand = Math.random().toString();
                m_users.findOneAndUpdate({ email: email }, { $set: { key_password_reset: md5(rand) } }, (err, result) => {
                    // console.log(result);
                    var url_password_reset = 'http://127.0.0.1:3000/password_reset?key=' + result.key_password_reset;

                    var authentication = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'authentication.smtp.mail@gmail.com',
                            pass: 'u+J%E^9!hx?p'
                        }
                    });

                    var mail_options = {
                        from: 'it.hoangsi@gmail.com',
                        to: email,
                        subject: 'Reset password',
                        html: '<a href="' + url_password_reset + '">' + url_password_reset + '</a>'
                    };
                    authentication.sendMail(mail_options, function (err, info) {
                        if (err) { console.log(err); } else {
                            console.log('Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.');
                        }
                    });
                });
            } else {
                console.log('Email khong ton tai');
            }
        });
    },
}
module.exports = users_controller;