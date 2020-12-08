// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-ui.css'
import './styles/selectpage.css'
import '@/assets/css/common.css'
import zqLocale from 'element-ui/lib/locale/lang/zh-CN' // lang zh
import ElementUI from 'element-ui'
import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'
import config from '../config'
import qs from 'qs'
import AMap from 'vue-amap'
import Fragment from 'vue-fragment'
import store from './store'
import vSelectPage from 'v-selectpage'
import {
  ValidationProvider,
  extend
} from 'vee-validate'
extend('secret', {
  validate: value => {
    // return /^[0-9]*$/g.test(value)
    console.log('vl===', value.length)
    return value.length > 30
  },
  message: '企业名称请输入30个字符以内字符'
})
Vue.component('ValidationProvider', ValidationProvider)

Vue.use(vSelectPage, {
  // server side data loader
  dataLoad: function (vue, data, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(resp => resolve(resp), resp => reject(resp))
    })
  }
})
Vue.use(Fragment.Plugin)
Vue.use(AMap) //全局挂载
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '65abcfa0a09736d411e94c7d99de3123',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'MarkerClusterer']
})
Vue.prototype.$qs = qs
Vue.prototype.$config = config
Vue.prototype.$echarts = echarts
// Vue.prototype.axios = axios;

//配置请求的根路径，路径地址待定具体看后台
// axios.defaults.baseURL = 'http://192.168.10.120:8080/api/login'
axios.interceptors.request.use(config => {
  console.log('config', config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
//Vue.use(VueAxios, axios);
Vue.use(
  ElementUI, {
    zqLocale
  },
  VueAxios,
  axios
) //中文
/* eslint-disable no-new */
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
