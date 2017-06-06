<template>
  <div id="app-container">
    <sidenav id="main-sidenav" ref="mainSidenav"></sidenav>
    <div id="main-wrapper">
      <md-layout md-gutter id="router-wrapper">
        <router-view @openSidenav="openSidenav()"></router-view>
      </md-layout>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import { Component, Watch } from 'vue-ts-decorate';
  import Sidenav from './components/Sidenav.vue'

  @Component({
    components: {
      'sidenav': Sidenav
    }
  })
  export default class App extends Vue {

    openSidenav() {
      (this.$refs.mainSidenav as any).$emit('openSidenav')
    }
  }
</script>

<style lang="scss">
  // Make sidenav component fixed on bigger screens
  #main-wrapper {
    @media (min-width: 1280px) {
      padding-left: 304px;
    }

    height: 100%;
  }

  #app-container, #router-wrapper, body {
    height: 100%;
  }
</style>