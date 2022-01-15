import axios from 'axios'
import qs from 'qs'

let baseURL = 'http://www.saas.perfma-inc.net/'
try{
  baseURL = location.href.indexOf("perfma.com") > -1 ? "https://perfma.com/" : 'http://www.saas.perfma-inc.net/'
} catch(err){

}
const request = axios.create({
  // baseURL: 'https://saas.heapdump.cn/',
  // baseURL: 'https://heapdump.cn',
  baseURL,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  timeout: 5000
})


// 设置request请求拦截器**
request.interceptors.request.use(
  (config) => {
    if (config.moethod === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// response响应拦截器**
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return Promise.resolve(response.data);
  },
  (error) =>
    Promise.reject(error),
);

export default request;
