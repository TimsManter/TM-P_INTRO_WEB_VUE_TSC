<template>
  <md-layout md-flex md-column>
    <md-toolbar>
      <h2 class="md-title" style="flex: 1">My projects on GitHub</h2>
      <md-icon md-iconset="mdi mdi-view-list"></md-icon>
      <md-switch v-model="cardView" class="toolbar-switch"></md-switch>
      <md-icon md-iconset="mdi mdi-view-grid"></md-icon>
    </md-toolbar>
    <div id="content-wrapper">
      <md-layout v-if="cardView" md-gutter="24">
        <project-card-item :repo="repo" v-for="repo in repos" key="repo.id"></project-card-item>
      </md-layout>
      <md-whiteframe v-else md-tag="section">
        <md-list>
          <md-list-item v-for="repo in repos" key="repo.id">
            <project-list-item :repo="repo"></project-list-item>
          </md-list-item>
        </md-list>
      </md-whiteframe>
    </div>
    <md-snackbar ref="errorMessage" md-position="top right">
      <span>{{ snackbarMessage }}</span>
    </md-snackbar>
  </md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Axios from 'axios'
  import ProjectListItem from '../elements/ProjectListItem.vue'
  import ProjectCardItem from '../elements/ProjectCardItem.vue'

  @Component({
    components: {
      'project-list-item': ProjectListItem,
      'project-card-item': ProjectCardItem
    }
  })
  export default class Sidenav extends Vue {
    repos: Array<Object> = []
    cardView: Boolean = true
    snackbarMessage: string = "No error"
    
    mounted() {
      Axios.get('/users/TimsManter/repos').then(response => {
        this.repos = response.data;
        this.snackbarMessage = response.statusText;
        (this.$refs.errorMessage as any).open();
      }).catch(error => {
        this.snackbarMessage = error;
        (this.$refs.errorMessage as any).open();
      })
    }

  }
</script>

<style lang="scss">
  .toolbar-switch {
    margin-left: 8px;
  }
</style>