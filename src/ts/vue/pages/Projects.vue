<template>
  <md-layout md-flex md-column>
    <md-toolbar>
      <md-layout md-hide-large-and-up>
        <md-button class="md-icon-button">
        <md-icon md-iconset="mdi mdi-menu"></md-icon>
      </md-button>
      </md-layout>
      <h2 class="md-title" style="flex: 1">My projects on GitHub</h2>
      <md-icon md-iconset="mdi mdi-view-list"></md-icon>
      <md-switch v-model="cardView" class="toolbar-switch"></md-switch>
      <md-icon md-iconset="mdi mdi-view-grid"></md-icon>
    </md-toolbar>
    <md-layout id="content-wrapper">
      <md-layout v-if="cardView" md-gutter="24">
        <md-layout v-for="repo in repos" :key="repo.id" md-flex="33" md-flex-small="50" md-flex-xsmall="100">
          <md-card md-with-hover @click.native="openDialog(repo.id)" :id="'p'+repo.id">
            <project-card-item :repo="repo"></project-card-item>
          </md-card>
        </md-layout>
      </md-layout>
      <md-layout v-else md-tag="md-whiteframe" md-flex="40" md-flex-small="100">
        <md-list class="md-double-line">
          <md-list-item @click.native="openDialog(repo.id)" v-for="repo in repos" :key="repo.id">
            <project-list-item :repo="repo"></project-list-item>
          </md-list-item>
        </md-list>
      </md-layout>
      <md-dialog v-for="repo in repos" :key="repo.id" :ref="repo.id">
        <md-dialog-title>{{ repo.name }}</md-dialog-title>
        <project-description :repo="repo"></project-description>
        <md-dialog-actions>
          <md-button class="md-accent" :href="repo.html_url" target="_blank">Open on GitHub</md-button>
          <md-button class="md-warn" @click.native="closeDialog(repo.id)">Close</md-button>
        </md-dialog-actions>
      </md-dialog>
    </md-layout>
    <md-snackbar ref="errorMessage" md-position="down right">
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
  import ProjectDescription from '../elements/ProjectDescription.vue'

  @Component({
    components: {
      'project-list-item': ProjectListItem,
      'project-card-item': ProjectCardItem,
      'project-description': ProjectDescription
    }
  })
  export default class Projects extends Vue {
    repos: Array<Object> = []
    cardView: Boolean = true
    snackbarMessage: string = "No error"
    
    mounted() {
      Axios.get('/users/TimsManter/repos').then(response => {
        this.repos = response.data;
        //this.snackbarMessage = response.statusText;
        //(this.$refs.errorMessage as any).open();
      }).catch(error => {
        this.snackbarMessage = error;
        (this.$refs.errorMessage as any).open();
      })
    }

    openDialog(id) {
      this.$refs[id][0].open()
    }
    closeDialog(id) {
      this.$refs[id][0].close()
    }
  }
</script>

<style lang="scss">
  .toolbar-switch {
    margin-left: 8px;
  }

  .md-list {
    width: 100%;
  }

  .md-dialog {
    max-width: 1000px;
  }
</style>