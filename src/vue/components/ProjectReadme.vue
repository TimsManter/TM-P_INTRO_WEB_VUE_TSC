<template>
  <md-layout md-column v-html="repo.ReadmeHtml">
  </md-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch, Prop } from "vue-ts-decorate";
  import Repository from "../../ts/Repository";

  @Component()
  export default class ProjectReadme extends Vue {
    @Prop()
    repo: Repository = null;
  }
</script>

<style lang="scss">
  
</style>