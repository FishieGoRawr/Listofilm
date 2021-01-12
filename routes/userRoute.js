const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login')
const passport = require('passport')
const path = '../views/user/'

const userModel = require('../models/User')
const UserController = require('../controllers/UserController')
const controller = new UserController

/* GET */
router.get('/profile', connectEnsureLogin.ensureLoggedIn('../auth/login'), (req, res) => {
    res.render(path + 'profile.ejs', { user: req.user })
})

router.get('/movies', connectEnsureLogin.ensureLoggedIn('../auth/login'), (req, res) => {
    res.render(path + 'movies.handlebars', { user: req.user, movies: req.user.movieList })
})

/* POST */
router.post('/updatePassword', connectEnsureLogin.ensureLoggedIn('/auth/login'), (req, res) => {
    controller.updatePassword('123')
})

router.post('/updateUsername', connectEnsureLogin.ensureLoggedIn('/auth/login'), (req, res) => {
    controller.updateUsername('LMAO')
})

router.post('/verifyChecked', connectEnsureLogin.ensureLoggedIn(), controller.saveCheckedMovies)

module.exports = router