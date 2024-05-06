const db = require("../../db/index");

const HotelType = {
    add: (req, res) => {
        const {name, order_num} = req.body
        const sql = 'insert into hotel_type (name, order_num) values (?,?)'
        db.query(sql, [name, order_num], (err, reslut) => {
            if(err) throw err
            res.send({
                code: '200'
            })
        })
    },
    getList: async (req, res) => {
        const { currentPage = 1, pageSize = 10 } = req.query;
        const page = (currentPage - 1) * pageSize;
        const size = Number(pageSize);
        const sql = `select * from hotel_type limit ${page},${size}`;
        const sql2 = "select count(*) as total from hotel_type";
        db.query(sql, (err, pageData) => {
          if (err) {
            throw err;
          }
          db.query(sql2, (err, count) => {
            if (err) {
              throw err;
            }
            res.send({
              code: "200",
              data: {
                data: pageData,
                total: count[0].total,
              },
            });
          });
        });
      },
      getListId: async (req, res) => {
        const {type_id} = req.params
        const sql = 'select * from hotel_type where type_id=?'
        db.query(sql, [type_id], (err, result) => {
            if(err) throw err
            res.send({
                code: '200',
                data: result
            })
        })
      },
      updateList: async (req, res) => {
        const {type_id, name, order_num} = req.body
        const sql = 'update hotel_type set name=?, order_num=? where type_id=?'
        db.query(sql, [name, order_num, type_id], (err, reslut) => {
            if(err) throw err
            res.send({
                code: '200',
            })
        })
      },
      delete: async (req, res) => {
        const {type_id} = req.params
        const sql = 'delete from hotel_type where type_id=?'
        db.query(sql, [type_id], (err, result) => {
            if (err) throw err
            res.send({
                code: '200'
            })
        })
      },
      search: async (req, res) => {
        const { name } = req.query;
        const sql = `select * from hotel_type where name like '%${name}%'`;
        db.query(sql, [name],(err, reslust) => {
          if (err) throw err;
          res.send({
            code: "200",
            data: reslust
          });
        })
      }
}

module.exports = HotelType