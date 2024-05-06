const db = require("../../db/index");

const HotelRoomController = {
  getSelect: async (req, res) => {
    const sql = "select name from hotel_type";
    db.query(sql, (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslut,
      });
    });
  },
  add: async (req, res) => {
    const {
      info_label,
      info_name,
      info_details,
      info_price,
      info_recommed,
      info_order,
      info_status,
      info_book,
    } = req.body;
    const info_service = JSON.stringify(req.body.checkService)
    const img_url = req.file ? `/roomuploads/${req.file.filename}` : "";
    const sql =
      "insert into hotel_info (info_label, info_name, img_url, info_details, info_price, info_recommed, info_order, info_status, info_service, info_book) values (?,?,?,?,?,?,?,?,?,?)";
    db.query(
      sql,
      [
        info_label,
        info_name,
        img_url,
        info_details,
        info_price,
        info_recommed,
        info_order,
        info_status,
        info_service,
        info_book,
      ],
      (err, reslut) => {
        if (err) throw err;
        res.send({
          code: "200",
        });
      }
    );
  },
  getService: async (req, res) => {
    const sql = "select * from hotel_service";
    db.query(sql, (err, reslut) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslut,
      });
    });
  },
  getList: async (req, res) => {
    const { currentPage = 1, pageSize = 10 } = req.query;
    const page = (currentPage - 1) * pageSize;
    const size = Number(pageSize);
    const sql = `select * from hotel_info limit ${page},${size}`;
    const sql2 = "select count(*) as total from hotel_info";
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
    const { info_id } = req.params;
    const sql = "select * from hotel_info where info_id=?";
    db.query(sql, [info_id], (err, result) => {
      if (err) throw err;
      // console.log(result[0].info_service);
      result.forEach(row => {
        row.info_service = JSON.parse(result[0].info_service).split(',')
        console.log(row.info_service[0]);
        
      });
      res.send({
        code: "200",
        data: result
      });
    });
  },
  updateList: async (req, res) => {
    const {
      info_id,
      info_label,
      info_name,
      info_details,
      info_price,
      info_recommed,
      info_order,
      info_status,
      info_book,
    } = req.body;
    const info_service = JSON.stringify(req.body.checkService)
    const img_url = req.file ? `/roomuploads/${req.file.filename}` : "";
    const sql = img_url
      ? "update hotel_info set info_label=?, info_name=?, img_url=?, info_details=?, info_price=?, info_recommed=?, info_order=?, info_status=?, info_service=?, info_book=? where info_id=? "
      : "update hotel_info set info_label=?, info_name=?, info_details=?, info_price=?, info_recommed=?, info_order=?, info_status=?, info_service=?, info_book=? where info_id=? ";

    const query_data = img_url
      ? [
          info_label,
          info_name,
          img_url,
          info_details,
          info_price,
          info_recommed,
          info_order,
          info_status,
          info_service,
          info_book,
          info_id,
        ]
      : [
          info_label,
          info_name,
          info_details,
          info_price,
          info_recommed,
          info_order,
          info_status,
          info_service,
          info_book,
          info_id,
        ];
    db.query(sql, query_data, (err, reslut) => {
      if (err) throw err;
      if (img_url) {
        res.send({
          code: "201",
          data: {
            info_label,
            info_name,
            img_url,
            info_details,
            info_price,
            info_recommed,
            info_order,
            info_status,
            info_service,
            info_book,
            info_id,
          },
        });
      } else {
        res.send({
          code: "201",
          data: {
            info_label,
            info_name,
            info_details,
            info_price,
            info_recommed,
            info_order,
            info_status,
            info_service,
            info_book,
            info_id,
          },
        });
      }
    });
  },
  delete: async (req, res) => {
    const { info_id } = req.params;
    const sql = "delete from hotel_info where info_id=?";
    db.query(sql, [info_id], (err, result) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },
  putRecommed: async (req, res) => {
    const { info_id, info_recommed } = req.body;
    const sql = "update hotel_info set info_recommed=? where info_id=?";
    db.query(sql, [info_recommed, info_id], (err, results) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },
  search: async (req, res) => {
    const { info_order } = req.query;
    const sql = `select * from hotel_info where info_order like '%${info_order}%'`;
    db.query(sql, [info_order],(err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust
      });
    })
  }
};

module.exports = HotelRoomController;
