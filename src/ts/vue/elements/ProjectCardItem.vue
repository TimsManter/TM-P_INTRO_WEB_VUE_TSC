<template>
  <md-layout md-flex="33" md-flex-small="50" md-flex-xsmall="100">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ repoName }}</div>
          <div class="md-subhead">{{ repo.description }}</div>
        </md-card-header-text>
        <md-card-media>
          <md-icon md-iconset="mdi mdi-school" class="md-size-3x"></md-icon>
        </md-card-media>
      </md-card-header>
    </md-card>
  </md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'

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
      return this.repoNameSections.split('-')[1]
    }
  }
</script>

<style lang="scss">
  .md-card {
    width: 100%;
    margin-bottom: 20px;
  }
</style>