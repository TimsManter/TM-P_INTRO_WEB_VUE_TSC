<template>
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
    <md-list>
      <md-list-item>
        <md-icon>home</md-icon>
        <span>Start</span>
      </md-list-item>
      <router-link tag="md-list-item" to="/projects">
        <md-icon md-iconset="mdi mdi-github-circle"></md-icon>
        <span>Projects</span>
      </router-link>
    </md-list>
  </md-sidenav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'

  @Component
  export default class Sidenav extends Vue {
    
  }
</script>

<style lang="scss">
  // Make sidenav component fixed on bigger screens
  @media (min-width: 1280px) {
    .md-sidenav-content {
      top: 0!important;
      pointer-events: auto!important;
      transform: translate3d(0, 0, 0)!important;
    }
  }
</style>