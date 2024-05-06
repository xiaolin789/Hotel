const db = require("../../db/index");

const SuggestionController = {
  suggestList: async (req, res) => {
    const { currentPage = 1, pageSize = 10 } = req.query;
    const page = (currentPage - 1) * pageSize;
    const {create_time} = req.body
    const size = Number(pageSize);
    const sql = `select * from hotel_suggest order by create_time desc limit ${page},${size}`;
    const sql2 = "select count(*) as total from hotel_suggest ";
    db.query(sql,[create_time], (err, pageData) => {
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
};

module.exports = SuggestionController;
