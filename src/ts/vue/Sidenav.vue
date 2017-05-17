<template>
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
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