const db = require("../../db/index");
const JWT = require("../../util/JWT");

const SysUserController = {
  login: async (req, res) => {
    const { username, password} = req.body
    // console.log(req.body);
    const sql = "select * from sys_user WHERE username=? AND password=?";
    db.query(sql, [username, password], (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        res.send({
          code: "-1",
          error: "用户名密码不匹配",
        });
      }
    else {
        const token = JWT.generate(
          {
            id: results[0].id,
            username: results[0].username,
          },
          "6h"
        );
        res.header("Authorization", token);
        res.send({
          code: "200",
          data: {
            username: results[0].username,
            user_id: results[0].user_id,
            role: results[0].role,
            token
          },
        });
      }
    });
  },

  add: async (req, res) => {
    const { username } = req.body;
    const sql = "select * from sys_user where username=?";
    db.query(sql, [username], (err, reslust) => {
      if (err) throw err;
      if (reslust.length > 0) {
        res.send({
          code: "201",
          error: "用户名已存在",
        });
      } else {
        const {
          username,
          password,
          phone,
          email,
          role,
          salary,
          sex,
          nick_name,
        } = req.body;
        const create_time = new Date();
        const sql =
          "insert into sys_user (username, password, phone, email, role, salary, sex, nick_name, create_time) values (?,?,?,?,?,?,?,?,?)";
        db.query(
          sql,
          [
            username,
            password,
            phone,
            email,
            role,
            salary,
            sex,
            nick_name,
            create_time,
          ],
          (err, reslust) => {
            if (err) throw err;
            res.send({
              code: "200",
            });
          }
        );
      }
    });
  },

  getList: async (req, res,) => {
   
    const { currentPage = 1, pageSize = 10 } = req.query;
    const page = (currentPage - 1) * pageSize;
    const size = Number(pageSize);
    const sql = `select * from sys_user limit ${page},${size}`;
    const sql2 = "select count(*) as total from sys_user";
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
    const { user_id } = req.params;
    const sql = "select * from sys_user where user_id=?";
    db.query(sql, [user_id], (err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust,
      });
    });
  },

  updateList: async (req, res) => {
    const {
      user_id,
      username,
      phone,
      email,
      role,
      salary,
      sex,
      nick_name,
    } = req.body;
    const update_time = new Date();
    const sql =
      "update sys_user set username=?, phone=?, email=?, role=?, salary=?, sex=?, nick_name=?, update_time=? where user_id=?";
    db.query(
      sql,
      [
        username,
        phone,
        email,
        role,
        salary,
        sex,
        nick_name,
        update_time,
        user_id,
      ],
      (err, reslust) => {
        if (err) throw err;
        res.send({
          code: "200",
        });
      }
    );
  },
  del: async (req, res) => {
    const { user_id } = req.params;
    const sql = "delete from sys_user where user_id=?";
    db.query(sql, [user_id], (err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },
  reset: async (req, res) => {
    const { user_id } = req.params;
    const password = "123456";
    const sql = "update sys_user set password=? where user_id=?";
    db.query(sql, [password, user_id], (err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
      });
    });
  },
  search: async (req, res) => {
    const { nick_name } = req.query;
    const sql = `select * from sys_user where nick_name like '%${nick_name}%'`;
    db.query(sql, [nick_name],(err, reslust) => {
      if (err) throw err;
      res.send({
        code: "200",
        data: reslust
      });
    })
  }
}

module.exports = SysUserController;
