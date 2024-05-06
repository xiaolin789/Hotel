const express = require('express')
const SuggestController = require('../../controllers/uniapp/SuggestController')
var Suggest = express.Router()

Suggest.post('/app/suggest', SuggestController.add)





module.exports = Suggest