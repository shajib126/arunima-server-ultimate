
const { isAuth } = require('../Auth/Auth.middleware')
const {signUp, user, signIn} = require('./User.controller')
const router = require('express').Router()


router.post('/signup' ,signUp).get('/me',isAuth,user).post('/signin',signIn)

module.exports = router