const express = require('express')
const SuggestionController = require('../../controllers/admin/SuggestionController')
var Suggestion = express.Router()

Suggestion.get('/api/suggest/getList', SuggestionController.suggestList)

module.exports = Suggestion