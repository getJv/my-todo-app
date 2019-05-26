import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
