<template>
  <md-layout md-flex md-column>
    <md-toolbar>
      <md-button @click.native="$emit('openSidenav')" class="md-icon-button md-hide-large-and-up">
        <md-icon md-iconset="mdi mdi-menu"></md-icon>
      </md-button>
      <md-layout>
        <md-layout md-tag="h2" md-hide-xsmall class="md-title">{{ title }}</md-layout>
      </md-layout>
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
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch, Prop } from "vue-ts-decorate";

  @Component()
  export default class BasePage extends Vue {
    @Prop()
    title: string = "My Intro";

    snackbarMessage: string = "Error";
  }
</script>

<style lang="scss">
  .toolbar-switch {
    margin-left: 8px;
  }
  
  #content-wrapper {
    padding: 20px 20px 0;
    overflow-y: auto;
  }
</style>