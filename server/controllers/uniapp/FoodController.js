const db = require("../../db/index");
const axios = require("axios");

const FoodController = {
    getList: async (req, res) => {
        const { name, img_url, price } = req.body;
        const sql = "select * from hotel_food";
        db.query(sql, [name, img_url, price], (err, result) => {
          if (err) throw err;
          res.send({
            code: "200",
            data: result,
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
      add: async (req, res) => {
        const {open_id,name, phone, room,num,img_url,foodname } = req.body;
        const status = 1
        const order_time = new Date();
        const sql = "insert into user_food (open_id,name, phone, room,num, order_time,img_url,foodname,status) values (?,?,?,?,?,?,?,?,?)";
        db.query(sql ,[open_id,name, phone, room,num, order_time,img_url,foodname,status],(err, result) => {
            if (err) throw err;
          res.send({
            code: "200",
          });
        })
      },
      getOrder: async (req, res) => {
        const { order_time } = req.query;
        const sql = "select * from user_food order by order_time desc";
          db.query(sql,[order_time], (err, reslust) => {
            if (err) throw err;
            res.send({
              code: "200",
              data: reslust
            });
          });
      },
      cancel: async (req, res) => {
        const {id} = req.params
        const status = 0
        const sql = "update user_food set status=? where id=?"
        db.query(sql, [status,id], (err, reslust) => {
          if (err) throw err;
          res.send({
            code: '200'
          })
        })
      }
}


module.exports = FoodController