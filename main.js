import Vue from 'vue'
import App from './App'
import store from './store'

//将vuex写入全局
Vue.prototype.$store=store; 
 
Vue.config.productionTip = false
//引入rem
// import "static/modules/rem.js"
//引入main.scss文件
import "./stylesheets/main.css"
//引入cookie

import VueClipboard from 'vue-clipboard2'//引入复制到剪切板插件
Vue.use(VueClipboard)

import {setCookie, getCookie, delCookie} from './common/util.js';
 Vue.prototype.$cookieStore = {
      setCookie,
      getCookie,
      delCookie
    }
import request from "./common/request.js"
Vue.prototype.$http = request;
import User from './common/user.js'
Vue.prototype.User = User
App.mpType = 'app'
import http from "./common/http.js"
Vue.prototype.$ok = http;
const app = new Vue({
	store,
    ...App
})
app.$mount()

