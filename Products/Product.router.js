
const router = require('express').Router()

const { createProduct, allProduct, productById } = require('./Product.controller')



router.post('/create',createProduct).get('/',allProduct).get('/:id',productById)

module.exports = router