const express = require('express')
const router = express.Router()
const connectEnsureLogin = require('connect-ensure-login')
const passport = require('passport')
const userModel = require('../models/User')
const AuthController = require('../controllers/AuthController')
const controller = new AuthController()
const path = '../views/auth/'

/* GET */
router.get('/login', controller.getLogin)

router.get('/register', controller.getRegister)

router.get('/logout', controller.logout)

/* POST */
router.post('/login', controller.login)

router.post('/register', controller.register)

module.exports = router