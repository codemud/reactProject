import axios from 'axios'
import { message } from 'antd';
import verify from "./verify";
import models from "./models";

const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 50000,
    withCredentials: true
});

//请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.Token = verify.token.get() ? verify.token.get() : "";
    config.headers.Username = models.userinfo.get() ? models.userinfo.get() : "";
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
      let res = response.data;
      if (res.resCode !== 0) {
          return message.warning(res.message)
      }
      return res;
  },
  error => {
      let res = error && error.response;
      let msg = "系统出错了，请重新刷新页面!";
      if (res) {
          switch (res.status) {
              case 500:
                  msg = "服务器遇到了一个意外!";
                  break;
              case 404:
                  msg = "服务器无法找到所请求的页面!";
                  break;
              default:
                  msg = "服务器出小差了!";
                  break;
          }
      }
      message.warning(msg);
      return Promise.reject(error);
  }
);

export default service
