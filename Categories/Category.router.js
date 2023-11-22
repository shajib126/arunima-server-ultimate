
const router = require('express').Router()
const { createCategory, allCategory, findCategory } = require('./Category.controller')

router.post('/create',createCategory).get('/',allCategory).get('/:id',findCategory)
module.exports = router