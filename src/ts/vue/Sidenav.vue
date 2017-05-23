<template>
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <tm-logo></tm-logo>
    <md-list>
      <md-list-item>
      </md-list-item>
      <md-list-item>
        <router-link to="/projects">
          <md-icon md-iconset="mdi mdi-github-circle"></md-icon>
          <span>Projects</span>
        </router-link>
      </md-list-item>
    </md-list>
  </md-sidenav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import TmLogo from './elements/TmLogo.vue'

  @Component({
    components: {
      'tm-logo': TmLogo
    }
  })
  export default class extends Vue {
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