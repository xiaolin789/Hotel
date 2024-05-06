const db = require("../../db/index");
const axios = require("axios");



const recommedController = {
  getList: async (req, res) => {
    const { info_name, img_url, info_price } = req.body;
    const sql = "select * from hotel_info";
    db.query(sql, [info_name, img_url, info_price], (err, result) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: result,
      });
    });
  },
  getListId: async (req, res) => {
    const { info_id } = req.params;
    const sql = "select * from hotel_info where info_id=?";
    db.query(sql, [info_id], (err, result) => {
      if (err) throw err;
      result.forEach(row => {
        row.info_service = JSON.parse(result[0].info_service).split(',')
        console.log(row.info_service[0]);
        
      });
      res.send({
        code: "200",
        data: result,
      });
    });
  },
  wxLogin: async (req, res) => {
    const appId = "wxb9518429ea507918";
    const appSecret = "4d7a941cb99a8a96ec699e5489225591";
    const grant_type = "authorization_code";
    const code = req.body.code;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=${grant_type}`;
    axios.post(url).then((data)=>{
      console.log('data',data.data.openid)
      const openid = data.data.openid
      res.send({
        data:openid
      })
    }).catch((error) => {
      console.log('err',error);
    })
  },
};

module.exports = recommedController;
