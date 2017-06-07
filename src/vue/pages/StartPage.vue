<template>
  <md-toolbar>
  </md-toolbar>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch } from "vue-ts-decorate";

  @Component()
  export default class StartPage extends Vue {
  }
</script>

<style lang="scss">
  .md-toolbar {
    padding: 0 20px;
  }
</style>