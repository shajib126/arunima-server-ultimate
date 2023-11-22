const router = require('express').Router()
const { isAuth } = require('../Auth/Auth.middleware')
const { addToCart, getAllCart, removeCart } = require('./Cart.controller')

router.post('/create',isAuth,addToCart).get('/',isAuth,getAllCart).delete('/:cartId',isAuth,removeCart)

module.exports = router