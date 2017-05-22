<template>
  <div>
    <md-icon v-if="repoType == 'S'" md-iconset="mdi mdi-school"></md-icon>
    <md-icon v-else-if="repoType == 'P'" md-iconset="mdi mdi-code-braces"></md-icon>
    <md-icon v-else-if="repoType == 'F'" md-iconset="mdi mdi-source-fork"></md-icon>
    <md-icon v-else-if="repoType == 'C'" md-iconset="mdi mdi-inbox"></md-icon>
    <div class="md-list-text-container">
      <span>{{ repo.name }}</span>
      <span>
        <span class="wrapper" v-if="repo.language != null">
          <md-icon md-iconset="mdi mdi-code-tags"></md-icon>
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
  </div>
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
      return this.repoNameSections[0].split('-')[1]
    }
  }
</script>