const connectEnsureLogin = require('connect-ensure-login')
const passport = require('passport')
const userModel = require('../models/User')
const mongoose = require('mongoose')

class UserController {
    updatePassword(req, res) {
        req.user.updatePassword(req.body.newPassword)
    }

    updateUsername(req, res) {
        req.user.updateUsername(req.body.newUsername)
    }

    saveCheckedMovies(req, res) {
        var currentUser = req.user
        var movieArray = req.body.checked
        var containsDupe = false
        var message = ''

        if (movieArray && movieArray.length > 1) {

            movieArray.forEach(movie => {
                var parsedMovie = JSON.parse(movie)
                if (!currentUser.findMovie(parsedMovie.id)) {
                    currentUser.addMovie(movie)
                } else {
                    containsDupe = true
                }
            })
        }

        currentUser.save()

        if (containsDupe) {
            message = 'Certains films etaient deja dans la liste, ils nont donc pas ete rajouter.'
        } else {
            message = 'Tout les films on ete ajouter avec succes.'
        }

        res.render('../views/movie/lookup.ejs', { user: req.user, movies: null, msg: message })
    }
}

module.exports = UserController