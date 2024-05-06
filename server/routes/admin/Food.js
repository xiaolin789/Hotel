const express = require('express')
const FoodController = require('../../controllers/admin/FoodController')
var Food = express.Router()

// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/fooduploads/' })

Food.post('/api/food', upload.single('file'), FoodController.add)
Food.get('/api/food/list', FoodController.getList)
Food.get('/api/food/listId/:id', FoodController.getListId)
Food.post('/api/food/updateList/:id', upload.single('file'), FoodController.updateList)
Food.delete('/api/food/list/:id', FoodController.delete)


module.exports = Food