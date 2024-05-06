const db = require("../../db/index");

const BannerController = {
  add: async (req, res) => {
    const { title, status } = req.body;
    const img_url = req.file ? `/banneruploads/${req.file.filename}` : "";
    const sql =
      "insert into hotel_banner (title, img_url, status) values (?,?,?)";
    db.query(sql, [title, img_url, status], (err, reslut) => {
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
    const sql = `select * from hotel_banner limit ${page},${size}`;
    const sql2 = "select count(*) as total from hotel_banner";
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
    const { ban_id } = req.params;
    const sql = "select * from hotel_banner where ban_id=?";
    db.query(sql, [ban_id], (err, result) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: result,
      });
    });
  },
  updateList: async (req, res) => {
    const { ban_id, title, status } = req.body;
    const img_url = req.file ? `/banneruploads/${req.file.filename}` : "";
    const sql = img_url
      ? "update hotel_banner set title=?, img_url=?, status=? where ban_id=? "
      : "update hotel_banner set title=?, status=? where ban_id=? ";

    const query_data = img_url
      ? [title, img_url, status, ban_id]
      : [title, status, ban_id];
    db.query(sql, query_data, (err, reslut) => {
      if (err) throw err;
      if (img_url) {
        res.send({
          code: "201",
          data: {
            title,
            img_url,
            status,
            ban_id,
          },
        });
      } else {
        res.send({
          code: "201",
          data: {
            title,
            status,
            ban_id,
          },
        });
      }
    });
  },
  delete: async (req, res) => {
    const { ban_id } = req.params;
    const sql = "delete from hotel_banner where ban_id=?";
    db.query(sql, [ban_id], (err, result) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },
  putPublish: async (req, res) => {
    const { ban_id, status } = req.body;
    const sql = "update hotel_banner set status=? where ban_id=?";
    db.query(sql, [status, ban_id], (err, results) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },
  search: async (req, res) => {
    const { title } = req.query;
    const sql = `select * from hotel_banner where title like '%${title}%'`;
    db.query(sql, [title],(err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust
      });
    })
  }
};

module.exports = BannerController;
