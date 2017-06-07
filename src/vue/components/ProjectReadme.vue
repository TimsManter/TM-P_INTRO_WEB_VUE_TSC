<template>
  <md-layout md-column v-html="desc">
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
    desc: string = null;

    @Watch("repo")
    updateDesc() {
      this.desc = this.repo.ReadmeHtml;
    }
  }
</script>

<style lang="scss">
  
</style>