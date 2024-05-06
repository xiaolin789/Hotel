const express = require('express')
const categoryController = require('../../controllers/uniapp/categoryController')
var Category = express.Router()

// Category.get('/app/category', categoryController.getList)
Category.get('/app/category/list', categoryController.getCategory)

module.exports = Category