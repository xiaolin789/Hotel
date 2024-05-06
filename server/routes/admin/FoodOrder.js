const express = require('express')
const FoodOrderController = require('../../controllers/admin/FoodOrderController')
var FoodOrder = express.Router()

FoodOrder.get('/api/foodorder/list', FoodOrderController.FoodOrderList)
FoodOrder.get('/api/searchfoodorder', FoodOrderController.search)
FoodOrder.put(`/api/foodorder/listId/:id`, FoodOrderController.change)


module.exports = FoodOrder