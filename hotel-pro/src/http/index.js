/* ------------- 配置axios拦截器 ------------ */
import axios from 'axios'
// 请求拦截器(在请求发出去之前,给每一个请求的请求头上添加token)
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 相应拦截器(每一个请求响应之前,将最新的token保存到浏览器混村中)
axios.interceptors.response.use(function (response) {
    console.log('拦截器起作用!');
    const {authorization } = response.headers
    authorization && localStorage.setItem("token",authorization)
    return response;
  }, function (error) {
    const {status} = error.response
    if(status===401){// 判断状态码(401为token过期,清除token返回登录页面)
        localStorage.removeItem("token")
        window.location.href="/login"
    }
    return Promise.reject(error);
  });