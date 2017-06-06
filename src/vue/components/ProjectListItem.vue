<template>
  <md-layout md-row class="repo-title-row">
    <md-icon v-if="repoType == 'S'" md-iconset="mdi mdi-school"></md-icon>
    <md-icon v-else-if="repoType == 'P'" md-iconset="mdi mdi-code-braces"></md-icon>
    <md-icon v-else-if="repoType == 'F'" md-iconset="mdi mdi-source-fork"></md-icon>
    <md-icon v-else-if="repoType == 'C'" md-iconset="mdi mdi-inbox"></md-icon>
    <md-icon v-else-if="repoType == 'T'" md-iconset="mdi mdi-file-hidden"></md-icon>
    <md-icon v-else md-iconset="mdi mdi-package"></md-icon>
    <div class="md-list-text-container">
      <span>{{ repo.name }}</span>
      <span>
        <span class="wrapper" v-if="repo.language != null">
          <md-icon md-iconset="mdi mdi-code-braces"></md-icon>
          <span class="attr">{{ repo.language }}</span>
        </span>
        <span class="wrapper">
          <md-icon md-iconset="mdi mdi-source-fork"></md-icon>
          <span class="attr">{{ repo.forks_count }}</span>
        </span>
        <span class="wrapper">
          <md-icon v-if="repo.stargazers_count == 0" md-iconset="mdi mdi-star-outline"></md-icon>
          <md-icon v-else md-iconset="mdi mdi-star"></md-icon>
          <span class="attr">{{ repo.stargazers_count }}</span>
        </span>
        <span class="wrapper">
          <md-icon v-if="repo.watchers_count == 0" md-iconset="mdi mdi-eye-outline"></md-icon>
          <md-icon v-else md-iconset="mdi mdi-eye"></md-icon>
          <span class="attr">{{ repo.watchers_count }}</span>
        </span>
      </span>
    </div>
  </md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import { Component, Watch } from 'vue-ts-decorate';

  @Component({
    props: {
      repo: Object
    }
  })
  export default class extends Vue {
    repo: Object

    get repoNameSections() {
      return (this.repo as any).name.split('_')
    }

    get repoName() {
      let name: String = this.repoNameSections[1]
      if (name == null) return this.repoNameSections[0]
      else return name
    }

    get repoType() {
      return this.repoNameSections[0].split('-')[1]
    }
  }
</script>

<style lang="scss">
  .md-layout > .md-icon {
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