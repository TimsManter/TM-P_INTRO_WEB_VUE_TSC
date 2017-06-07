<template>
  <md-layout md-row class="repo-title-row">
    <md-icon v-if="repo.name.type == 'S'" md-iconset="mdi mdi-school"></md-icon>
    <md-icon v-else-if="repo.name.type == 'P'" md-iconset="mdi mdi-code-braces"></md-icon>
    <md-icon v-else-if="repo.name.type == 'F'" md-iconset="mdi mdi-source-fork"></md-icon>
    <md-icon v-else-if="repo.name.type == 'C'" md-iconset="mdi mdi-inbox"></md-icon>
    <md-icon v-else-if="repo.name.type == 'T'" md-iconset="mdi mdi-file-hidden"></md-icon>
    <md-icon v-else md-iconset="mdi mdi-package"></md-icon>
    <div class="md-list-text-container">
      <span>{{ repo.name.fullName }}</span>
      <span>
        <span class="wrapper" v-if="repo.language != null">
          <md-icon md-iconset="mdi mdi-code-braces"></md-icon>
          <span class="attr">{{ repo.language }}</span>
        </span>
        <span class="wrapper">
          <md-icon md-iconset="mdi mdi-source-fork"></md-icon>
          <span class="attr">{{ repo.forksCount }}</span>
        </span>
        <span class="wrapper">
          <md-icon v-if="repo.stargazersCount == 0" md-iconset="mdi mdi-star-outline"></md-icon>
          <md-icon v-else md-iconset="mdi mdi-star"></md-icon>
          <span class="attr">{{ repo.stargazersCount }}</span>
        </span>
        <span class="wrapper">
          <md-icon v-if="repo.watchersCount == 0" md-iconset="mdi mdi-eye-outline"></md-icon>
          <md-icon v-else md-iconset="mdi mdi-eye"></md-icon>
          <span class="attr">{{ repo.watchersCount }}</span>
        </span>
      </span>
    </div>
  </md-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch, Prop } from "vue-ts-decorate";

  @Component()
  export default class extends Vue {
    @Prop()
    repo: Object;
  }
</script>

<style lang="scss">
  .md-layout>.md-icon {
    margin-right: 16px;
    margin-top: 6px;
  }
  
  .md-list-text-container span.wrapper {
    margin-right: 4px;
  
    .md-icon {
      $size: 16px;
  
      width: $size;
      min-width: $size;
      height: $size;
      min-height: $size;
      font-size: $size;
      line-height: $size;
    }
  
    span.attr {
      vertical-align: middle;
    }
  }
  
  .repo-title-row {
    flex-wrap: nowrap;
    max-width: 100%;
  }
</style>