const express = require('express')
const recommedController = require('../../controllers/uniapp/recommedController')
var Recommed = express.Router()

Recommed.get('/app/getlist', recommedController.getList)
Recommed.get('/app/getList/:info_id', recommedController.getListId)
Recommed.post('/wxapi/user/wxLogin', recommedController.wxLogin)

module.exports = Recommed