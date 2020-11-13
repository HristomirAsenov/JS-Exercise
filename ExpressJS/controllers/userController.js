const { User } = require('../models');
const { jwt } = require('../utils');
const { cookie } = require('../config');

module.exports = {
    get: {
        login(req, res, next) {
            res.render('./user/login.hbs')
        },
        register(req, res, next) {
            res.render('./user/register.hbs')
        },
        profile(req, res, next) {
            res.render('./user/profile.hbs')
        },

        logout(req, res, next) {
            res
                .clearCookie(cookie)
                .redirect('/home/');
        }
    },

    post: {
        register(req, res, next) {

            const { email, fullName, password } = { ...req.body };

            User
                .findOne({ email })
                .then((user) => {
                    if (user) {
                        throw new Error('The given email is already in use...');
                    }
                    return User.create({ email, fullName, password })
                })
                .then((createdUser) => {
                    res.redirect('/user/login');
                })
                .catch((e) => {
                    console.log(e);
                    res.redirect('/user/register');
                });

        },

        login(req, res, next) {

            const { email, password } = req.body;

            User
                .findOne({ email })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user,
                    ])
                })
                .then(([isPasswordsMatched, user]) => {
                    if (!isPasswordsMatched) {
                        throw new Error('The provided password does not matched.');
                    }

                    const token = jwt.createToken(user._id);

                    res
                        .status(200)
                        .cookie(cookie, token, { maxAge: 3600000 })
                        .redirect('/shoes/all');

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
};
