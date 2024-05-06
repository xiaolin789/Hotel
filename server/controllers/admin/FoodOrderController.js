const db = require("../../db/index");


const OrderController = {
    FoodOrderList: async (req, res) => {
      const { currentPage = 1, pageSize = 10 } = req.query;
      const page = (currentPage - 1) * pageSize;
      const { create_time } = req.body;
      const size = Number(pageSize);
      const sql = `select * from user_food order by order_time desc limit ${page},${size}`;
      const sql2 = "select count(*) as total from user_food ";
      db.query(sql, [create_time], (err, pageData) => {
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
    search: async (req, res) => {
      const { name } = req.query;
      const sql = `select * from user_food where name like '%${name}%'`;
      db.query(sql, [name],(err, reslust) => {
        if (err) throw err;
        res.send({
          code: "200",
          data: reslust
        });
      })
    },
    change: async (req, res) => {
      const { id } = req.params;
      const status = 3
      const sql = "update user_food set status=? where id=?";
      db.query(sql, [status,id],(err, reslust) => {
        if (err) throw err;
        res.send({
          code: "200",
          data: reslust
        });
      })
    },
  };
  
  module.exports = OrderController;
  