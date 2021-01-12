const connectEnsureLogin = require('connect-ensure-login')
const passport = require('passport')
const userModel = require('../models/User')
const path = '../views/movie/'

const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('a99253be8460b73fabac971ce4abf757', { language: 'fr-CA' });

class MovieController {
    getLookupMovies(req, res) {
        res.render(path + 'lookup.ejs', { user: req.user, movies: null, msg: null })
    }

    async lookupMovies(req, res) {
        var message = ''
        var movieList = []

        if (req.body.title.length > 50) {
            message = "C'est sur que tu deconne, arrete de nienser"
        } else {
            var args = {
                query: {
                    query: req.body.title,
                    page: 1
                }
            }

            var data = (await mdb.search.movies(args)).data
            var pageCount = data.total_pages
            var totalResults = data.total_results

            if (totalResults >= 50) {
                message = 'Trop de resultats. Veuillez specifier votre recherche'
            } else if (totalResults == 0) {
                message = 'Aucun resultat.'
            } else {
                for (let i = 1; i <= pageCount; i++) {
                    args.query.page = i
                    var response = await mdb.search.movies(args);

                    (response.data.results).forEach(movie => {
                        movieList.push(movie)
                    })
                }
            }
        }

        res.render(path + '/lookup.ejs', { user: req.user, movies: movieList, msg: message })
    }
}

module.exports = MovieController