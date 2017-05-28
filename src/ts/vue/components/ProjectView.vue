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
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Axios from 'axios'
  import Component from 'vue-class-component'
  import ProjectReadme from '../components/ProjectReadme.vue'
  import { Watch } from 'vue-property-decorator'

  @Component({
    components: {
      'project-readme': ProjectReadme
    },
    props: {
      repo: Object
    }
  })
  export default class ProjectView extends Vue {
    repo: Object
    desc: String = ""
    snackbarMessage: String = "Error"

    $refs = {
      errorMessage: VueMaterial.MdSnackbar
    }

    get name() {
      return typeof(this.repo) != undefined ? (this.repo as any).name : "<no name>"
    }

    mounted() {
      this.onRepoChange()
    }

    @Watch('repo')
    onRepoChange() {
      Axios.get('/repos/TimsManter/' + (this.repo as any).name + '/readme', {
        headers: {
          'Accept': 'application/vnd.github.v3.text+json'
        }
      }).then(response => {
        this.desc = atob(response.data.content)
        //this.snackbarMessage = response.statusText
        //(this.$refs.errorMessage as any).open()
      }).catch(error => {
        this.snackbarMessage = "README for " +
          (this.repo as any).name +
          ": " + error.response.data.message
        this.$refs.errorMessage.open();
        console.log(error.config)
      })
    }
  }
</script>