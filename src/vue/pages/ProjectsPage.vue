<template>
  <base-page @openSidenav="$emit('openSidenav')">
    <!-- Toolbar Actions -->
    <template slot="toolbar-actions">
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
    </template>
  
    <!-- Card View -->
    <md-layout v-if="cardView" md-gutter="24">
      <md-layout v-for="repo in filteredRepos" :key="repo.id" md-flex="33" md-flex-small="50" md-flex-xsmall="100">
        <md-card md-with-hover @click.native="openDialog(repo.id)" :id="'p'+repo.id">
          <project-card-item :repo="repo"></project-card-item>
        </md-card>
      </md-layout>
    </md-layout>
    <!-- List View -->
    <md-layout id="list-view-container" v-else md-gutter="24">
      <md-layout id="list-view-list" md-flex="40" md-flex-small="100">
        <md-whiteframe>
          <md-list class="md-double-line">
            <md-list-item v-for="repo in filteredRepos" :key="repo.id" @click.native="openProject(repo)">
              <project-list-item :repo="repo"></project-list-item>
            </md-list-item>
          </md-list>
        </md-whiteframe>
      </md-layout>
      <md-layout id="list-view-preview" v-if="projectRepo.name != undefined" md-hide-small>
        <md-whiteframe>
          <project-view :repo="projectRepo"></project-view>
        </md-whiteframe>
      </md-layout>
    </md-layout>
  
    <!-- Dialogs -->
    <md-dialog v-for="repo in api.Repos" :key="repo.id" :ref="repo.id" @open="openFirstTab()">
      <md-dialog-title>{{ repo.name }}</md-dialog-title>
      <md-dialog-content>
        <project-view :repo="repo"></project-view>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" :href="repo.html_url" target="_blank">Open on GitHub</md-button>
        <md-button class="md-warn" @click.native="closeDialog(repo.id)">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  
    <!-- Snackbar -->
    <md-snackbar ref="errorMessage" md-position="top center" md-duration="10000">
      <span>{{ snackbarMessage }}</span>
    </md-snackbar>
  </base-page>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch } from "vue-ts-decorate";
  import ProjectListItem from "../components/ProjectListItem.vue";
  import ProjectCardItem from "../components/ProjectCardItem.vue";
  import ProjectView from "../components/ProjectView.vue";
  import BasePage from "./templates/BasePage.vue";
  import RepoTypes from "../../ts/RepoTypes";
  import Repository from "../../ts/Repository";
  import GitHubApi from "../../ts/GitHubApi";

  @Component({
    components: {
      ProjectListItem,
      ProjectCardItem,
      ProjectView,
      BasePage
    }
  })
  export default class ProjectsPage extends Vue {
    private api: GitHubApi = null;
    cardView: boolean = true;
    snackbarMessage: string = "No errors";
    projectTypes: RepoTypes = null;
    projectRepo: Object = null;

    $refs: {
      errorMessage: VueMaterial.MdSnackbar
    };

    get filteredRepos(): Repository[] {
      let repos: Repository[] = [];
      for (let repo in this.api.Repos) {
        let name = (this.api.Repos[repo] as any).name;
        let type = this.repoTypePartName(name);
        for (let t in this.projectTypes) {
          if (this.projectTypes[t] && t === type) {
            repos.push(this.api.Repos[repo]);
            break;
          }
        }
      }
      return repos;
    }

    mounted() {
      this.projectTypes = new RepoTypes();
      this.api = new GitHubApi("TimsManter");
    }

    openFirstTab() {
      (document.querySelector(".md-dialog .md-tabs button.md-tab-header") as any).click();
    }

    openProject(repo) {
      if (this.cardView || window.innerWidth < 945) {
        this.openDialog(repo.id);
      }
      else {
        this.projectRepo = repo;
      }
    }
    openDialog(id) {
      this.$refs[id][0].open();
    }
    closeDialog(id) {
      this.$refs[id][0].close();
    }
    selectType(type: string) {
      this.projectTypes[type] = !this.projectTypes[type];
    }

    repoNameSections(repoName: string): string[] {
      return repoName.split("_");
    }

    repoNamePart(repoName: string): string {
      let name: string = this.repoNameSections(repoName)[1];
      if (name === "undefined") { return this.repoNameSections(repoName)[0]; }
      else { return name; }
    }

    repoTypePartName(repoName: string): string {
      switch (this.repoNameSections(repoName)[0].split("-")[1]) {
        case "C":
          return "container";
        case "P":
          return "project";
        case "S":
          return "study";
        case "F":
          return "fork";
        case "T":
          return "template";
        default:
          return "other";
      }
    }

    get projectTypesMenuText() {
      let menuText: string[] = [];
      for (let type in this.projectTypes) {
        if (this.projectTypes[type] === true) {
          menuText.push(type);
        }
      }
      if (Object.keys(this.projectTypes).length === menuText.length) {
        return "All";
      }
      else if (menuText.length === 0) {
        return "None";
      }
      else { return menuText.join(" | "); }
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
    width: 1000px;
  }
  
  .md-toolbar {
    padding: 0 20px;
  }
  
  .md-whiteframe {
    width: 100%;
  }
  
  #list-view-container {
    padding-bottom: 20px;
  
    #list-view-list {
      align-self: flex-start;
      max-height: 100%;
  
      .md-list {
        height: 100%;
        overflow-y: auto;
      }
    }
  
    #list-view-preview {
      .md-tab {
        height: 100%;
        overflow-y: auto;
      }
  
      .md-tabs,
      .md-tabs-content {
        height: 100% !important;
      }
    }
  }
</style>