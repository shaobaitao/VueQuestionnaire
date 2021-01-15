import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)
Vue.use(VueClipboard)
// import moment from 'moment'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// Vue.use(moment)
Vue.use(VueRouter)
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})