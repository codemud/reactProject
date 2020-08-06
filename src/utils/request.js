import axios from 'axios'
import { message } from 'antd';

const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 50000,
    withCredentials: true
});

//请求拦截器
service.interceptors.request.use(
  config => {
    // config.headers.Authorization = getToken() ? "Bearer " + getToken() : "";
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
      console.log(res,'111')
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
          }
      }
      message.warning(msg);
      return Promise.reject(error);
  }
);

export default service
