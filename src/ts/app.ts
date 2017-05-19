import Vue from 'vue'
import VueMaterial from 'vue-material'
import Component from 'vue-class-component'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import './../scss/style.scss'

import App from './vue/App.vue'

Axios.defaults.baseURL = 'https://api.github.com'

Vue.use(VueMaterial)
Vue.use(VueAxios)
Vue.use(Axios)
new Vue({
  el: '#app',
  render: r => r(App, {

  })
})