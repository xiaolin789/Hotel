const db = require("../../db/index");


const SysRoleController = {
    // 新增
    add: async (req, res) => {
        const {role_name, remark} = req.body
        const create_time = new Date()
        const sql = "insert into sys_role (role_name, remark, create_time) values (?,?,?)"
        db.query(sql, [role_name, remark, create_time], (err, result) => {
            if (err) throw err
            res.send({
                code: '200'
            })
        })
        console.log(res);
    },
    // 获取列表数据
    getList: async (req, res) => {
        const {currentPage=1,pageSize=10} = req.query
        const page = (currentPage-1)*pageSize
        const size = Number(pageSize)
        const sql = `select * from sys_role limit ${page},${size}`
        const sql2 = 'select count(*) as total from sys_role'
        db.query(sql, (err, pageData) => {
            if(err) {
                throw err
            }
            db.query(sql2, (err,count) => {
                if(err) {
                    throw err
                }
                res.send({
                    code: '200',
                    data: {
                        data: pageData,
                        total: count[0].total
                    }
                })
            })
        })
    },
    // 获取编辑数据
    getListId: async (req, res) => {
        const {role_id} = req.params
        const sql = 'select * from sys_role where role_id=?'
        db.query(sql, [role_id], (err, result) => {
            if(err) throw err
            res.send({
                code: '200',
                data: result
            })
        })
    },
    // 编辑成功更新数据
    putList: async (req, res)=> {
        const { role_id, role_name, remark} = req.body
        const update_time = new Date()
        const sql = 'update sys_role set role_name=?, remark=?, update_time=? where role_id=?'
        db.query(sql, [role_name, remark, update_time, role_id], (err, result) => {
            if(err) throw err
            res.send({
                code: '200',
            })
        })
    },
    // 删除
    del: async (req, res)=> {
        const {role_id} = req.params
        const sql = 'delete from sys_role where role_id=?'
        db.query(sql, [role_id], (err, result) => {
            if (err) throw err
            res.send({
                code: '200'
            })
        })
    },

    search: async (req, res) => {
        const { role_name } = req.query;
        const sql = `select * from sys_role where role_name like '%${role_name}%'`;
        db.query(sql, [role_name],(err, reslust) => {
          if (err) throw err;
          res.send({
            code: "200",
            data: reslust
          });
        })
      }
}


module.exports = SysRoleController