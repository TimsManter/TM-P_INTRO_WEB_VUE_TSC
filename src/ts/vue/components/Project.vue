<template>
  <!--<md-tabs>
    <md-tab md-label="Readme">-->
      <project-readme :repo="repo"></project-readme>
    <!--</md-tab>
  </md-tabs>-->
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import ProjectReadme from '../components/ProjectReadme.vue'

  @Component({
    components: {
      'project-readme': ProjectReadme
    },
    props: {
      repo: Object
    }
  })
  export default class Projects extends Vue {
  }
</script>