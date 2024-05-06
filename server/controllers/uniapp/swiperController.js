const db = require("../../db/index");

const swiperController = {
  getSwiper: async (req, res) => {
    const { img_url } = req.body;
    const sql = "select img_url from hotel_banner";
    db.query(sql, [img_url], (err, result) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: result,
      });
    });
  },
};

module.exports = swiperController;
