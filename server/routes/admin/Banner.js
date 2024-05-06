const express = require('express')
const BannerController = require('../../controllers/admin/BannerController')
var Banner = express.Router()

// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/banneruploads/' })

Banner.post('/api/banner', upload.single('file'), BannerController.add)
Banner.get('/api/banner/list', BannerController.getList)
Banner.get('/api/banner/listId/:ban_id', BannerController.getListId)
Banner.post('/api/banner/updateList/:ban_id', upload.single('file'), BannerController.updateList)
Banner.delete('/api/banner/list/:ban_id', BannerController.delete)
Banner.put("/api/banner/publish", BannerController.putPublish)
Banner.get('/api/searchban', BannerController.search)

module.exports = Banner