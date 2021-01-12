const passport = require('passport')
const flash = require('connect-flash')
const userModel = require('../models/User')
const connectEnsureLogin = require('connect-ensure-login')
const path = '../views/auth/'

class AuthController {
    getLogin(req, res) {
        res.render(path + 'login.ejs', { user: req.user })
    }

    getRegister(req, res) {
        res.render(path + 'register.ejs', { user: req.user })
    }

    login(req, res) {
        passport.authenticate('local',
            (err, user, info) => {
                if (err) {
                    return res.redirect('/auth/login?info=' + info)
                }

                if (!user) {
                    return res.redirect('/auth/login?info=' + info)
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return (err)
                    }

                    return res.redirect('/')
                })
            })(req, res)
    }

    register(req, res) {
        userModel.register(new userModel({ username: req.body.username }), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                return res.render(path + 'register.ejs', { user: user });
            }

            passport.authenticate("local")(req, res, () => {
                res.render('index.ejs', { user: req.user });
            })
        })
    }

    logout(req, res) {
        if (req.user) { req.logout() }
        res.redirect('/')
    }
}

module.exports = AuthController