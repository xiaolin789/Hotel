const db = require("../../db/index");

const HotelServiceController = {
  add: async (req, res) => {
    const { name, order_num } = req.body;
    const sql = "insert into hotel_service (name, order_num) values (?,?)";
    db.query(sql, [name, order_num], (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },

  getList: async (req, res) => {
    const { currentPage = 1, pageSize = 10 } = req.query;
    const page = (currentPage - 1) * pageSize;
    const size = Number(pageSize);
    const sql = `select * from hotel_service limit ${page},${size}`;
    const sql2 = "select count(*) as total from hotel_service";
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
    const {service_id} = req.params
    const sql = 'select * from hotel_service where service_id=?'
    db.query(sql, [service_id], (err, result) => {
        if(err) throw err
        res.send({
            code: '200',
            data: result
        })
    })
  },
  updateList: async (req, res) => {
    const {service_id, name, order_num} = req.body
    const sql = 'update hotel_service set name=?, order_num=? where service_id=?'
    db.query(sql, [name, order_num, service_id], (err, reslut) => {
        if(err) throw err
        res.send({
            code: '200',
        })
    })
  },
  delete: async (req, res) => {
    const {service_id} = req.params
    const sql = 'delete from hotel_service where service_id=?'
    db.query(sql, [service_id], (err, result) => {
        if (err) throw err
        res.send({
            code: '200'
        })
    })
  },
  search: async (req, res) => {
    const { name } = req.query;
    const sql = `select * from hotel_service where name like '%${name}%'`;
    db.query(sql, [name],(err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust
      });
    })
  }
};

module.exports = HotelServiceController;
