<template>
  <div>
    <sidenav></sidenav>
    <div id="main-wrapper">
      <md-layout md-gutter id="router-wrapper">
        <router-view></router-view>
      </md-layout>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Sidenav from './elements/Sidenav.vue'

  @Component({
    components: {
      'sidenav': Sidenav
    }
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  // Make sidenav component fixed on bigger screens
  @media (min-width: 1280px) {
    #main-wrapper {
      padding-left: 304px;
    }
  }

  #content-wrapper {
    padding: 0 20px;
  }

  .md-toolbar {
    margin-bottom: 20px;
  }
</style>