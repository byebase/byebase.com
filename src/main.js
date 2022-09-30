import "babel-polyfill"; //兼容IE11浏览器
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
import router from "./router";
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/main.css";
import "./assets/css/global.css";
import "./assets/font/iconfont.css";
import url from "./assets/base/url.js"; // 全局url.js
import main from "./assets/base/main.js"; // main.js
import extend from "./extend";

Vue.prototype.$axios = axios;
Vue.prototype.url = url;
Vue.prototype.main = main;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(extend);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})