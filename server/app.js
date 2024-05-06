var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


const JWT = require("./util/JWT");
const SysRole = require("./routes/admin/SysRole");
const SysUser = require("./routes/admin/SysUser");
// const SysMenu = require('./routes/admin/SysMenu')
const HotelService = require("./routes/admin/HotelService");
const HotelType = require("./routes/admin/HotelType");
const HotelRoom = require("./routes/admin/HotelRoom");
const Banner = require("./routes/admin/Banner");
const Home = require("./routes/admin/Home")
const Order = require("./routes/admin/Order")
const Suggestion = require("./routes/admin/Suggestion")
const Food = require("./routes/admin/Food")
const FoodOrder = require("./routes/admin/FoodOrder")

const Swiper = require("./routes/uniapp/Swiper");
const Recommed = require('./routes/uniapp/Recommed')
const Category = require('./routes/uniapp/Category')
const BookRoom = require('./routes/uniapp/BookRoom')
const Suggest = require('./routes/uniapp/Suggest')
const useFood = require('./routes/uniapp/useFood')

var app = express();

app.all("/app/*", (req, res, next) => {
  //设置允许跨域响应报文头
  //设置跨域
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With"); // X-Requested-With
  //res.header("Access-Control-Allow-Methods", "*");

  res.header("Access-Control-Allow-Origin", "*"); // 设置服务器支持的所有头信息字段
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  ); // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  res.setHeader("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(Swiper);
app.use(Recommed)
app.use(Category)
app.use(BookRoom)
app.use(Suggest)
app.use(useFood)

app.use((req, res, next) => {
  // 如果token有效，next()
  // 如果token过期，返回401

  if (req.url === "/api/user/login") {
    next();
    return;
  }

  const token = req.headers["authorization"].split(" ")[1];
  console.log('llll',token);
  if (token) {
    var payload = JWT.verify(token);
    console.log(payload);
    if (payload) {
      const newToken = JWT.generate(
        {
          id: payload.id,
          username: payload.username,
        },"1d");
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" });
      return
    }
  }
});

app.use(SysRole);
app.use(SysUser);
// app.use(SysMenu)
app.use(HotelService);
app.use(HotelType);
app.use(HotelRoom);
app.use(Banner);
app.use(Home)
app.use(Order)
app.use(Suggestion)
app.use(Food)
app.use(FoodOrder)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
