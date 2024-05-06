const express = require('express')
const OrderController = require('../../controllers/admin/OrderController')
var Order = express.Router()

Order.get('/api/order/list', OrderController.orderList)
Order.get('/api/uniOrder/list', OrderController.uniOrderList)
Order.get('/api/searchorder', OrderController.search)
Order.get('/api/searchuniorder', OrderController.search2)


module.exports = Order