var express = require('express')
const HotelServiceController = require('../../controllers/admin/HotelServiceController')
var HotelService = express.Router()


HotelService.post('/api/service', HotelServiceController.add)
HotelService.get('/api/service/list', HotelServiceController.getList)
HotelService.get('/api/service/listId/:service_id', HotelServiceController.getListId)
HotelService.put('/api/service/updateList/:service_id', HotelServiceController.updateList)
HotelService.delete('/api/service/list/:service_id', HotelServiceController.delete)
HotelService.get('/api/searchservice', HotelServiceController.search)

module.exports = HotelService