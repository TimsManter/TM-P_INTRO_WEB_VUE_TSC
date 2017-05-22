<template>
  <vue-markdown :source="desc"></vue-markdown>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Axios from 'axios'
  import VueMarkdown from 'vue-markdown'

  @Component({
    props: {
      repo: Object
    },
    components: {
      'vue-markdown': VueMarkdown
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
          'Accept': 'application/vnd.github.v3.text+json'
        }
      }).then(response => {
        this.desc = atob(response.data.content);
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