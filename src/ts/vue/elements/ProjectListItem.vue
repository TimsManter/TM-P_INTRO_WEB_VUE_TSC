<template>
  <div>
    <md-icon v-if="repoType == 'S'" md-iconset="mdi mdi-school"></md-icon>
    <md-icon v-else-if="repoType == 'P'" md-iconset="mdi mdi-code-braces"></md-icon>
    <md-icon v-else-if="repoType == 'F'" md-iconset="mdi mdi-source-fork"></md-icon>
    <md-icon v-else-if="repoType == 'C'" md-iconset="mdi mdi-inbox"></md-icon>
    <span>{{ repo.name }}</span>
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