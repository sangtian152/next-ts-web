import axios, { AxiosRequestConfig, Canceler } from 'axios'
import qs from 'qs'
import { message } from 'antd';
import { reduxStore } from '@/store'

const getBaseUrl = () => {
  let baseURL = 'https://ygj.jzhangfang.com/' // 测试环境
  let partnerId = 'wx8138818152795a71'
  return {
    baseURL,
    partnerId
  }
}
// const baseURL = 'https://xcx.youzics.com/' //正式环境
// 创建axios实例
const service = axios.create({
    // baseURL,
    timeout: 600000 // 请求超时时间 10分钟
  })
  
  // 防止多次请求接口，把前一次请求取消
  let pending: { u: string; f: Canceler; }[] = []; //声明一个数组用于存储每个请求的取消函数和axios标识
  let cancelToken = axios.CancelToken;
  let cancelPending = (config:AxiosRequestConfig) => {
    pending.forEach((item, index) => {
      if (!!config) {
        if (item.u === config.url) {
          item.f(); //取消请求
          pending.splice(index, 1); //移除当前请求记录
        };
      } else {
        item.f(); //取消请求
        pending.splice(index, 1); //移除当前请求记录
      }
    });
  };


// 拦截器
service.interceptors.response.use((response) => {
    if (response.data.Status!==1) {
      message.error(response.data.Msg);
    }
    return response
}, (error) => {
    return Promise.reject(error)
})
service.interceptors.request.use((config) => {
    const {baseURL, partnerId} = getBaseUrl()
    // 防止多次请求接口，把前一次请求取消
    let curl = config.url
    cancelPending(config);
    config.cancelToken = new cancelToken((c) => {
      if(curl && curl.substring(0,1) == '/'){
        curl = curl.substring(1, curl.length)
      }
      pending.push({'u': (baseURL + curl), 'f': c});
    });
    config.url = baseURL + curl
    if (!config.isUpload) {
      const payload = {
        // partnerId: localStorage.getItem('app_partnerId') || undefined,
        partnerId,
        ...config.data,
      }
      config.data = qs.stringify(payload)
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

export default service
