import Vue from 'vue'
import VueMaterial from 'vue-material'
import Component from 'vue-class-component'
import './../scss/style.scss'

import App from './vue/App.vue'

Vue.use(VueMaterial);
new Vue({
  el: '#app',
  render: r => r(App, {

  })
})