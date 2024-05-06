const express = require('express')
const BookRoomController = require('../../controllers/uniapp/BookRoomController')
var BookRoom= express.Router()

BookRoom.post('/app/bookOrder', BookRoomController.add)
BookRoom.get('/app/home/getOrder', BookRoomController.getOrder)
BookRoom.put('/app/leave/:room_id', BookRoomController.leaveRoom)

module.exports = BookRoom