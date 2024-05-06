const express = require('express')
const HotelTypeController = require('../../controllers/admin/HotelTypeController')
var HotelType = express.Router()

HotelType.post('/api/type', HotelTypeController.add)
HotelType.get('/api/type/list', HotelTypeController.getList)
HotelType.get('/api/type/listId/:type_id', HotelTypeController.getListId)
HotelType.put('/api/type/updateList/:type_id', HotelTypeController.updateList)
HotelType.delete('/api/type/list/:type_id', HotelTypeController.delete)
HotelType.get('/api/searchtype', HotelTypeController.search)


module.exports = HotelType