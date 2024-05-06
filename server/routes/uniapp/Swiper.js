const express = require('express')
const swiperController = require('../../controllers/uniapp/swiperController')
var Swiper = express.Router()

Swiper.get('/app/swiper', swiperController.getSwiper)



module.exports = Swiper