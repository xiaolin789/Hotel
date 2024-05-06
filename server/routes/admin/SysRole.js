var express = require('express')
const SysRoleController = require('../../controllers/admin/SysRoleController')
var SysRole = express.Router()

// 新增
SysRole.post('/api/role', SysRoleController.add)
// 获取数据进行分页展示
SysRole.get('/api/role/list', SysRoleController.getList)
// 获取编辑数据
SysRole.get('/api/role/listId/:role_id', SysRoleController.getListId)
// 编辑成功更新数据
SysRole.put('/api/role/updateList/:role_id', SysRoleController.putList)
// 删除
SysRole.delete('/api/role/list/:role_id', SysRoleController.del)

SysRole.get('/api/searchrole', SysRoleController.search)

module.exports = SysRole;