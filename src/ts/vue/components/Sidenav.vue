<template>
  <md-sidenav class="md-left">
    <md-layout md-column>
      <md-layout style="flex: 0 0 auto;">
        <tm-logo></tm-logo>
      </md-layout>
      <md-layout style="flex: 1 1 auto;">
        <md-list>
          <md-list-item>
            <router-link to="/projects">
              <md-icon md-iconset="mdi mdi-github-circle"></md-icon>
              <span>Projects</span>
            </router-link>
          </md-list-item>
        </md-list>
      </md-layout>
      <md-layout md-align="center" style="flex: 0 0 auto;">
        <span class="md-caption caption-span">
          Made with
          <md-icon class="caption-icon" md-iconset="mdi mdi-heart"></md-icon>
          using
          <a href="https://en.wikipedia.org/wiki/Free_and_open-source_software" target="_blank">FOSS</a>
        </span>
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
      > .md-layout {
        height: 100%;
      }
      .caption-icon {
        font-size: 16px;
        width: 16px;
        min-width: 16px;
      }
      .caption-span {
        padding-bottom: 10px;
      }
    }
  }
</style>