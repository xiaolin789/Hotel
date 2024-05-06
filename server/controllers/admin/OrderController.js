const db = require("../../db/index");

const OrderController = {
  orderList: async (req, res) => {
    const { currentPage = 1, pageSize = 10 } = req.query;
    const page = (currentPage - 1) * pageSize;
    const { create_time } = req.body;
    const size = Number(pageSize);
    const sql = `select * from into_order order by create_time desc limit ${page},${size}`;
    const sql2 = "select count(*) as total from into_order ";
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
  uniOrderList: async (req, res) => {
    const { currentPage = 1, pageSize = 10 } = req.query;
    const page = (currentPage - 1) * pageSize;
    const { book_time } = req.body;
    const size = Number(pageSize);
    const sql = `select * from wx_user order by book_time desc limit ${page},${size}`;
    const sql2 = "select count(*) as total from wx_user ";
    db.query(sql, [book_time], (err, pageData) => {
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
    const sql = `select * from into_order where name like '%${name}%'`;
    db.query(sql, [name],(err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust
      });
    })
  },
  search2: async (req, res) => {
    const { name } = req.query;
    const sql = `select * from wx_user where name like '%${name}%'`;
    db.query(sql, [name],(err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust
      });
    })
  }
};

module.exports = OrderController;
