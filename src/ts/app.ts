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

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/start',
      component: Start
    },
    {
      path: '/',
      redirect: '/projects'
    }
  ]
})

new Vue({
  el: '#app',
  router: router,
  render: r => r(App, {
  })
})