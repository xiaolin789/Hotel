const db = require("../../db/index");

const BookRoomController = {
  add: async (req, res) => {
    const {open_id, name, to_time, phone, room_id, room_code, img_url } = req.body;
    const book = 1
    const book_time = new Date();
    const sql =
      "insert into wx_user (open_id,name, phone, book_time, to_time, book,room_id,room_code,img_url) values (?,?,?,?,?,?,?,?,?)";
    const sql2 =
      "update hotel_info, wx_user set hotel_info.info_book = wx_user.book where info_id = room_id";
    db.query(
      sql,
      [open_id,name, phone, book_time, to_time, book,room_id,room_code,img_url],
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
  getOrder: async (req, res) => {
    const { book_time } = req.query;
    const sql = "select * from wx_user order by book_time desc";
      db.query(sql,[book_time], (err, reslust) => {
        if (err) throw err;
        res.send({
          code: "200",
          data: reslust
        });
      });
  },
  leaveRoom: async (req, res) => {
    const {room_id} = req.params
    const leave_time = new Date();
    const book = 0
    const room_code = null
    const sql = "update wx_user a join hotel_info b on a.room_id = b.info_id set a.book=?, leave_time=?, room_code=? where room_id=?"
    const sql2 = "update hotel_info, wx_user set hotel_info.info_book = wx_user.book where info_id = room_id";
    db.query(sql,[book,leave_time,room_code,room_id], (err, reslust) => {
        if(err) throw err
       db.query(sql2,(err, reslust2) => {
        if(err) throw err
        res.send({
            code: '200',
            data: reslust2
        })
       })
    })
  }
};

module.exports = BookRoomController;
