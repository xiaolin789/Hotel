const express = require('express')
const SysUserController = require('../../controllers/admin/SysUserController')
var SysUser = express.Router()

SysUser.post('/api/user/login', SysUserController.login)

SysUser.post('/api/user', SysUserController.add)
SysUser.get('/api/user/list', SysUserController.getList)
SysUser.get('/api/user/listId/:user_id', SysUserController.getListId)
SysUser.put('/api/user/updateList/:user_id', SysUserController.updateList)
SysUser.delete('/api/user/list/:user_id', SysUserController.del)
SysUser.post('/api/user/listPassword/:user_id', SysUserController.reset)
SysUser.get('/api/searchuse', SysUserController.search)


module.exports = SysUser;