<template>
  <md-tabs>
    <md-tab md-label="Readme">
      <project-readme :name="name"></project-readme>
      <md-snackbar ref="errorMessage" md-position="bottom center">
        <span>{{ snackbarMessage }}</span>
      </md-snackbar>
    </md-tab>
  </md-tabs>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import Axios from "axios";
  import { Component, Watch, Prop } from "vue-ts-decorate";
  import ProjectReadme from "../components/ProjectReadme.vue";
  import Repository from "../../ts/Repository";

  @Component({
    components: {
      ProjectReadme
    }
  })
  export default class ProjectView extends Vue {
    @Prop()
    repo: Repository;
    snackbarMessage: String = "Error";

    $refs = {
      errorMessage: VueMaterial.MdSnackbar
    };

    get name() {
      return typeof (this.repo) !== undefined ? this.repo.name : "<no name>";
    }
  }
</script>