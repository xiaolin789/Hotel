const db = require("../../db/index");

const categoryController = {
    getList: async(req, res) => {
      const {name} = req.body
      const sql = 'select * from hotel_type'
      db.query(sql, [name], (err,result) => {
        if (err) throw err
        res.send({
            code: '200',
            data: result
        })
      })  
    },
    getCategory: async(req, res) => {
      const {info_label,info_name, img_url} = req.body
      const sql = 'select * from hotel_info where info_book=0 and info_status=1 '
      db.query(sql, [info_label,info_name, img_url], (err, result) => {
        if (err) throw err
        res.send({
            code: '200',
            data: result
        })
      })
    }
}

module.exports = categoryController