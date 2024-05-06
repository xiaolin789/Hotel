const db = require("../../db/index");

const FoodController = {
    add: async (req, res) => {
        const { name,detail, price } = req.body;
        const img_url = req.file ? `/fooduploads/${req.file.filename}` : "";
        const sql =
          "insert into hotel_food (name, detail, img_url, price) values (?,?,?,?)";
        db.query(sql, [name, detail,img_url, price], (err, reslut) => {
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
        const sql = `select * from hotel_food limit ${page},${size}`;
        const sql2 = "select count(*) as total from hotel_food";
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
        const { id } = req.params;
        const sql = "select * from hotel_food where id=?";
        db.query(sql, [id], (err, result) => {
          if (err) throw err;
          res.send({
            code: "200",
            data: result,
          });
        });
      },
      updateList: async (req, res) => {
        const { id, name, detail, price } = req.body;
        const img_url = req.file ? `/fooduploads/${req.file.filename}` : "";
        const sql = img_url
          ? "update hotel_food set name=?, detail=?,img_url=?, price=? where id=? "
          : "update hotel_food set name=?, detail=?,price=? where id=? ";
    
        const query_data = img_url
          ? [name, detail,img_url, price, id]
          : [name, detail,price, id];
        db.query(sql, query_data, (err, reslut) => {
          if (err) throw err;
          if (img_url) {
            res.send({
              code: "201",
              data: {
                name,
                detail,
                img_url,
                price,
                id,
              },
            });
          } else {
            res.send({
              code: "201",
              data: {
                name,
                detail,
                price,
                id,
              },
            });
          }
        });
      },
      delete: async (req, res) => {
        const { id } = req.params;
        const sql = "delete from hotel_food where id=?";
        db.query(sql, [id], (err, result) => {
          if (err) throw err;
          res.send({
            code: "200",
          });
        });
      },
      search: async (req, res) => {
        const { name } = req.query;
        const sql = `select * from hotel_food where name like '%${name}%'`;
        db.query(sql, [name],(err, reslust) => {
          if (err) throw err;
          res.send({
            code: "200",
            data: reslust
          });
        })
      }
}






module.exports = FoodController;