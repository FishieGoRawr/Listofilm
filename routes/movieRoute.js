const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login')
const passport = require('passport')
const userModel = require('../models/User')
const path = '../views/movie/'
const MovieController = require('../controllers/MovieController.js')
const controller = new MovieController

const MovieDB = require('node-themoviedb');
const { json } = require('body-parser')
const mdb = new MovieDB('a99253be8460b73fabac971ce4abf757', { language: 'fr-CA' });

/* GET */
router.get('/lookup', controller.getLookupMovies)

/* POST */
router.post('/lookup', controller.lookupMovies)

module.exports = router