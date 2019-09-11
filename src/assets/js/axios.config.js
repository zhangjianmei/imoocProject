// axios 配置 测试
import Vue from 'vue';
import axios from  'axios';

// 设置 axios 请求 baseUrl
// axios.defaults.baseURL = 'https://easy-mock.com/mock/5ceb51b551e3de74af53fe54/imooc/api';
axios.defaults.baseURL = 'http://39.105.131.75:3001/';



axios.interceptors.request.use( config => {
  // config.url = '/api' + config.url;
  if (config.params) {
    config.params.token = '5d764c8907ebf312676f59e1';
  } else {
    config.params = {
      token: '5d764c8907ebf312676f59e1'
    }
  }

  return config;
});

/**
 * 设置拦截器，interceptors 响应处理，
 * 所有使用 axios 的请求响应，都会优先回调到拦截器中
 * 在正确的返回情况下，数据会优先进入第一个回调方法
 * 在请求错误的情况下，错误会进入第二个回调方法
 */
axios.interceptors.response.use((response) => {
  //  统一处理数据，使组件中的请求只获取到需要的业务数据，
  // 而不需要去关注返回的状态码等与业务无关的数据
  // console.log('响应拦截器');
  return response.data.data;
}, (error) => {
  // 处理错误的响应
  return Promise.reject(error);
});

//  绑定到 vue 原型中，组件中 ： this.$http -> axios 。
Vue.prototype.$http = axios;
