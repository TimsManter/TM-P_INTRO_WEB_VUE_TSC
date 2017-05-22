<template>
  <div v-html="desc"></div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Axios from 'axios'

  @Component({
    props: {
      repo: Object
    }
  })
  export default class extends Vue {
    repo: Object
    desc: String = ""
    snackbarMessage: string = "No error"

    get repoNameSections() {
      return (this.repo as any).name.split('_')
    }

    get repoName() {
      let name: String = this.repoNameSections[1]
      if (name == null) return this.repoNameSections[0]
      else return name
    }

    get repoType() {
      return this.repoNameSections[0].split('-')[1]
    }

    mounted() {
      Axios.get('/repos/TimsManter/' + (this.repo as any).name + '/readme', {
        headers: {
          'Accept': 'application/vnd.github.v3.html'
        }
      }).then(response => {
        this.desc = response.data;
        //this.snackbarMessage = response.statusText;
        //(this.$refs.errorMessage as any).open();
      }).catch(error => {
        this.snackbarMessage = error;
        (this.$refs.errorMessage as any).open();
      })
    }
  }
</script>

<style lang="scss">
</style>