<template>
  <md-layout md-flex md-column>
    <md-toolbar>
      <md-button class="md-icon-button md-hide-large-and-up">
        <md-icon md-iconset="mdi mdi-menu"></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">My projects on GitHub</h2>
      <slot name="toolbar-actions"></slot>
    </md-toolbar>
    <md-layout id="content-wrapper">
      <slot></slot>
    </md-layout>
    <md-snackbar ref="errorMessage" md-position="top center">
      <span>{{ snackbarMessage }}</span>
    </md-snackbar>
  </md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'

  @Component({
    props: {
      
    }
  })
  export default class BasePage extends Vue {
    snackbarMessage: string = "Error"
  }
</script>

<style lang="scss">
  .toolbar-switch {
    margin-left: 8px;
  }

  .md-toolbar {
    padding: 0 20px;
  }
</style>