
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'

Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 添加请求拦截器，在请求头部加token
axios.interceptors.request.use(
  config =>{
    if(localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  error =>{
    return Promise.reject(error);
  }
);
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
