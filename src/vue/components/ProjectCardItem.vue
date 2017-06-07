<template>
  <div>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ repoName }}</div>
        <div class="md-subhead">
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
        </div>
      </md-card-header-text>
      <md-card-media>
        <md-icon v-if="repoType == 'S'" md-iconset="mdi mdi-school" class="md-size-3x"></md-icon>
        <md-icon v-else-if="repoType == 'P'" md-iconset="mdi mdi-code-braces" class="md-size-3x"></md-icon>
        <md-icon v-else-if="repoType == 'F'" md-iconset="mdi mdi-source-fork" class="md-size-3x"></md-icon>
        <md-icon v-else-if="repoType == 'C'" md-iconset="mdi mdi-inbox" class="md-size-3x"></md-icon>
        <md-icon v-else-if="repoType == 'T'" md-iconset="mdi mdi-file-hidden" class="md-size-3x"></md-icon>
        <md-icon v-else md-iconset="mdi mdi-package" class="md-size-3x"></md-icon>
      </md-card-media>
    </md-card-header>
    <md-card-content>
      {{ repo.description }}
    </md-card-content>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch, Prop } from "vue-ts-decorate";

  @Component()
  export default class extends Vue {
    @Prop()
    repo: Object;

    get repoNameSections() {
      return (this.repo as any).name.split("_");
    }

    get repoName() {
      let name: String = this.repoNameSections[1];
      if (name === null) { return this.repoNameSections[0]; }
      else { return name; }
    }

    get repoType() {
      return this.repoNameSections[0].split("-")[1];
    }
  }
</script>

<style lang="scss">
  .md-card {
    width: 100%;
    margin-bottom: 20px;
  
    .md-card-header-text {
      flex-wrap: nowrap;
    }
  
    .md-subhead {
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
      span.wrapper {
        margin-right: 4px;
      }
    }
    .md-title {
      text-overflow: ellipsis;
    }
  }
  
  .md-title {
    text-overflow: ellipsis;
  }
</style>