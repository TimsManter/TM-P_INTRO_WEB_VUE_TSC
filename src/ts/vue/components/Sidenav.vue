<template>
  <md-sidenav class="md-left">
    <md-layout md-column>
      <md-layout>
        <tm-logo></tm-logo>
      </md-layout>
      <md-layout>
        <md-list>
          <md-list-item>
            <router-link to="/projects">
              <md-icon md-iconset="mdi mdi-github-circle"></md-icon>
              <span>Projects</span>
            </router-link>
          </md-list-item>
        </md-list>
      </md-layout>
      <md-layout md-align="end">
        <span>Test</span>
      </md-layout>
    </md-layout>
  </md-sidenav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import TmLogo from './TmLogo.vue'

  @Component({
    components: {
      'tm-logo': TmLogo
    }
  })
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
      overflow-x: hidden !important;
    }
  }
</style>