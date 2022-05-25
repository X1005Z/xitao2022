import axios from 'axios'

import {Toast} from 'vant'

import store from '../store/index.js'
import router from '../router/index.js'

// 创建axios实例，配置请求和响应拦截器
const instance = axios.create({
    baseURL: 'http://api.w0824.com/api/',
    timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // 将token通过请求头（token）带给服务器进行验证
    // console.log('请求拦截器token：', store.state.token);
    if(store.state.token) {
        config.headers['token'] = store.state.token;
    }

    // 告诉服务器，不需要缓存
    // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP1请求时，
    // 把浏览器端缓存页面的最后修稿事件一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较
    config.headers['If-Modified-Since'] = 0; // 设置请求头，告诉服务端不要缓存，服务器会返回最新的资源
    
    Toast.loading({
        duration: 0,
        message: '加载中......',
        forbidClick: true,
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
    Toast.clear();

    let {status, message} = response.data;

    // 对后台接口返回状态码进行统一管理
    // console.log('响应拦截器：', response.data);
    if(status === 40001) {
        Toast(message);
        // 清除原token和userInfo
        store.commit('clearUserInfo');
        router.push('/login');
        return;
    }

    // 对响应数据做点什么
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    Toast.clear();
    return Promise.reject(error);
})

// 导出axios实例
export default instance;