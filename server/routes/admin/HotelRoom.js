const express = require('express')
const HotelRoomController = require('../../controllers/admin/HotelRoomController')
var HotelRoom = express.Router()

// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/roomuploads/' })

HotelRoom.get('/api/room/select', HotelRoomController.getSelect)
HotelRoom.post('/api/room', upload.single('file'), HotelRoomController.add)
HotelRoom.get('/api/room/service', HotelRoomController.getService)
HotelRoom.get('/api/room/list', HotelRoomController.getList)
HotelRoom.get('/api/room/listId/:info_id', HotelRoomController.getListId)
HotelRoom.post('/api/room/updateList/:info_id', upload.single('file'), HotelRoomController.updateList)
HotelRoom.delete('/api/room/list/:info_id', HotelRoomController.delete)
HotelRoom.put("/api/room/recommed", HotelRoomController.putRecommed)
HotelRoom.get('/api/searchroom', HotelRoomController.search)




module.exports = HotelRoom