// Imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import Component from 'vue-class-component'
import Axios from 'axios'
import './../scss/style.scss'

// Components
import App from './vue/App.vue'
import Projects from './vue/pages/Projects.vue'
import Start from './vue/pages/Start.vue'

Axios.defaults.baseURL = 'https://api.github.com'

Vue.use(VueRouter);
Vue.use(VueMaterial);

(Vue as any).material.registerTheme('default', {
  primary: {
    color: 'cyan',
    hue: 700
  },
  accent: {
    color: 'green',
    hue: 500
  },
  warn: {
    color: 'red',
    hue: 500
  },
  background: {
    color: 'white',
    hue: 500
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/projects',
      alias: '/',
      component: Projects
    },
    {
      path: '/start',
      component: Start
    }
  ]
})

new Vue({
  el: '#app',
  router: router,
  render: r => r(App, {
  })
})