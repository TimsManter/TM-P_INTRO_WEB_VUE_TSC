<template>
  <md-layout md-flex md-column>
    <md-toolbar>
      <md-button class="md-icon-button md-hide-large-and-up">
        <md-icon md-iconset="mdi mdi-menu"></md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">My projects on GitHub</h2>
      <md-menu md-align-trigger :md-close-on-select="false" md-direction="bottom left">
        <md-button md-menu-trigger>{{ projectTypesMenuText }}</md-button>
        <md-menu-content>
          <md-menu-item @selected="selectType(projectType)" v-for="projectType in Object.keys(projectTypes)" :key="projectType">
            <md-checkbox :id="projectType" :name="projectType" v-model="projectTypes[projectType]">{{ projectType }}</md-checkbox>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
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
          <md-dialog-content>
            <project :repo="repo"></project>
          </md-dialog-content>
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
  import Project from '../elements/Project.vue'

  @Component({
    components: {
      'project-list-item': ProjectListItem,
      'project-card-item': ProjectCardItem,
      'project': Project
    }
  })
  export default class Projects extends Vue {
    repos: Array<Object> = []
    cardView: boolean = true
    snackbarMessage: string = "No error"
    projectTypes: RepoTypes = new RepoTypes()
    
    mounted() {
      Axios.get('/users/TimsManter/repos').then(response => {
        this.repos = response.data;
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
    selectType(type: string) {
      this.projectTypes[type] = !this.projectTypes[type]
    }

    repoNameSections(repo) {
      return (repo as any).name.split('_')
    }

    repoName(repo) {
      let name: String = this.repoNameSections(repo)[1]
      if (name == null) return this.repoNameSections(repo)[0]
      else return name
    }

    repoType(repo) {
      return this.repoNameSections(repo)[0].split('-')[1]
    }

    get projectTypesMenuText() {
      let menuText: string[] = []
      for (let type in this.projectTypes) {
        if (this.projectTypes[type] == true) {
          menuText.push(type)
        }
      }
      if (Object.keys(this.projectTypes).length == menuText.length) {
        return "All"
      }
      else if (menuText.length == 0) {
        return "None"
      }
      else return menuText.join(' | ')
    }
  }

  class RepoTypes {
    Container: boolean = true
    Project: boolean = true
    Study: boolean = true
    Fork: boolean = true
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

  .md-toolbar {
    padding: 0 20px;
  }
</style>