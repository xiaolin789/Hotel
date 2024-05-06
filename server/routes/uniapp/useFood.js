const express = require('express')
const FoodController = require('../../controllers/uniapp/FoodController')
var useFood = express.Router()

useFood.get('/app/getfoodlist', FoodController.getList)
useFood.get('/app/getfoodlist/:id', FoodController.getListId)
useFood.post('/wxapi/user/wxLogin', FoodController.wxLogin)
useFood.post('/app/foodOrder', FoodController.add)
useFood.get('/app/food/getOrder', FoodController.getOrder)
useFood.put('/app/cancel/:id', FoodController.cancel)

module.exports = useFood