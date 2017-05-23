<template>
  <md-tabs>
    <md-tab md-label="Readme">
      <project-description :repo="repo"></project-description>
    </md-tab>
  </md-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Axios from 'axios'
  import ProjectListItem from '../elements/ProjectListItem.vue'
  import ProjectCardItem from '../elements/ProjectCardItem.vue'
  import ProjectDescription from '../elements/ProjectDescription.vue'

  @Component({
    components: {
      'project-list-item': ProjectListItem,
      'project-card-item': ProjectCardItem,
      'project-description': ProjectDescription
    }
  })
  export default class Projects extends Vue {
  }
</script>