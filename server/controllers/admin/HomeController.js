const db = require("../../db/index");

const HomeController = {
  roomList: async (req, res) => {
    const sql = "select * from hotel_info";
    db.query(sql, (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslut,
      });
    });
  },
  getListId: async (req, res) => {
    const { info_id, info_order } = req.body;
    const sql = "select info_order from hotel_info where info_id=? ";
    db.query(sql, [info_order, info_id], (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslut,
      });
    });
  },
  boomRoom: async (req, res) => {
    const {
      name,
      sex,
      phone,
      card,
      info_book,
      price,
      info_code,
      room_id,
      user,
    } = req.body;
    const create_time = new Date();
    const sql =
      "insert into into_order (name,sex,phone,card,create_time,info_book,price,info_code,room_id,user) values (?,?,?,?,?,?,?,?,?,?)";
    const sql2 =
      "update hotel_info, into_order set hotel_info.info_book = into_order.info_book where info_order = info_code";
    db.query(
      sql,
      [
        name,
        sex,
        phone,
        card,
        create_time,
        info_book,
        price,
        info_code,
        room_id,
        user,
      ],
      (err, reslut) => {
        if (err) throw err;
        db.query(sql2, (err, reslut2) => {
          if (err) throw err;
          res.send({
            code: "200",
            data: reslut2,
          });
        });
      }
    );
  },
  changeBook: async (req, res) => {
    const { info_id } = req.params;
    const leave_time = new Date();
    const info_book = 0;
    const info_code = null;
    const sql =
    "update into_order a join hotel_info b on a.room_id = b.info_id set a.info_book=?, leave_time=?, info_code=? where info_id=?";
  const sql2 =
    "update hotel_info, into_order set hotel_info.info_book = into_order.info_book where info_id = room_id";
  db.query(
    sql,
    [info_book, leave_time, info_code, info_id],
    (err, reslut) => {
      if (err) throw err;
      db.query(sql2, (err, reslut2) => {
        if (err) throw err;
        res.send({
          code: "200",
          data: reslut2,
        });
      });
    }
  );
    
  },
  getbookId: async (req, res) => {
    const sql = "select * from into_order";
    db.query(sql, (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslut,
      });
    });
  },
  getTotal: async (req, res) => {
    const sql =
      "select count(rm.info_id) as total_count,sum(case when rm.info_book = '0' then 1 else 0 end) as no_book_count, sum(case when rm.info_book = '1' then 1 else 0 end) as has_book_count from hotel_info as rm";
    db.query(sql, (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslut,
      });
    });
  },
  search: async (req, res) => {
    const { info_order } = req.query;
    const sql = `select * from hotel_info where info_order like '%${info_order}%'`;
    db.query(sql, [info_order], (err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust,
      });
    });
  },
};

module.exports = HomeController;
