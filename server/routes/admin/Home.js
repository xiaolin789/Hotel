const express = require('express')
const HomeController = require('../../controllers/admin/HomeController')
var Home = express.Router()

Home.get('/api/roomList', HomeController.roomList)
Home.post('/api/room/book', HomeController.boomRoom)
Home.get('/api/room/book/:info_id', HomeController.getListId)
Home.put('/api/room/update/:info_id', HomeController.changeBook)
Home.get('/api/bookroom', HomeController.getbookId)
Home.get('/api/home/getTotal', HomeController.getTotal)
Home.get('/api/searchhome', HomeController.search)

module.exports = Home