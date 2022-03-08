import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueTouch from 'vue-touch'
// 所有引入设置的小插件都要在这里定义（部分）

Vue.config.productionTip = false
Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
