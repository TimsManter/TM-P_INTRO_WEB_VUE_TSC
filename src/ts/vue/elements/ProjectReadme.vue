<template>
  <md-template v-html="desc"></md-template>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Axios from 'axios'
  import Marked from 'marked'

  @Component({
    props: {
      repo: Object
    }
  })
  export default class ProjectReadme extends Vue {
    repo: Object
    desc: string = ""
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
        this.desc = this.prefixImgSrc(Marked(atob(response.data.content)))
        //this.snackbarMessage = response.statusText
        //(this.$refs.errorMessage as any).open()
      }).catch(error => {
        this.snackbarMessage = error;
        (this.$refs.errorMessage as any).open();
      })
    }

    prefixImgSrc(html: string): string {
      do {
        var imgPos: number = html.indexOf('<img', imgPos+4)
        if (imgPos > -1)
        {
          let srcPos: number = html.indexOf('src="', imgPos)
          let slices: string[] = [
            html.slice(0, srcPos+5),
            "https://raw.githubusercontent.com/TimsManter/",
            (this.repo as any).name,
            "/master/",
            html.slice(srcPos+5)
          ]
          html = slices.join("")
        }
      }
      while (imgPos > -1)
      return html
    }
  }
</script>

<style lang="scss">
</style>