<template>
  <md-tabs>
    <md-tab md-label="Readme">
      <project-readme :desc="desc" :name="name"></project-readme>
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

  @Component({
    components: {
      ProjectReadme
    }
  })
  export default class ProjectView extends Vue {
    @Prop()
    repo: IRepository;
    desc: String = "";
    snackbarMessage: String = "Error";

    $refs = {
      errorMessage: VueMaterial.MdSnackbar
    };

    get name() {
      return typeof (this.repo) !== undefined ? this.repo.name : "<no name>";
    }

    mounted() {
      this.updateRepoData();
    }

    @Watch("repo")
    onRepoChange() {
      this.updateRepoData();
    }

    updateRepoData() {
      Axios.get("/repos/TimsManter/" + this.repo.name + "/readme", {
        headers: {
          "Accept": "application/vnd.github.v3.text+json"
        }
      }).then(response => {
        this.desc = atob(response.data.content);
      }).catch(error => {
        this.snackbarMessage = "README for " +
          this.repo.name +
          ": " + error.response.data.message;
        this.$refs.errorMessage.open();
        console.log(error.config);
      });
    }
  }

  interface IRepository {
    name: string;
  }
</script>