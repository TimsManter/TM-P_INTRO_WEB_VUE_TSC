<template>
  <div>
    <md-icon v-if="repo.fork" md-iconset="mdi mdi-source-fork"></md-icon>
    <md-icon v-else md-iconset="mdi mdi-git"></md-icon>
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
  }
</script>