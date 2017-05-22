<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{ repo.name }}</div>
      <div class="md-subhead">{{ repo.description }}</div>
    </md-card-header>
  </md-card>
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