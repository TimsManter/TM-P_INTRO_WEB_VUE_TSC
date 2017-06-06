<template>
  <md-layout md-column v-html="desc"></md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import { Component, Watch } from 'vue-ts-decorate';
  import Marked from 'marked'

  @Component({
    props: {
      repo: Object
    }
  })
  export default class ProjectDetails extends Vue {
    repo: Object = null
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

    @Watch('repo')
    onRepoChange() {
      Axios.get('/repos/TimsManter/' + (this.repo as any).name + '/readme', {
        headers: {
          'Accept': 'application/vnd.github.v3.text+json'
        }
      }).then(response => {
        this.desc = this.prefixLinks(Marked(atob(response.data.content)))
        //this.snackbarMessage = response.statusText
        //(this.$refs.errorMessage as any).open()
      }).catch(error => {
        this.snackbarMessage = error;
        (this.$refs.errorMessage as any).open();
      })
    }

    prefixLinks(html: string): string {
      return this.prefixLinkHref(this.prefixImgSrc(html))
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

    prefixLinkHref(html: string): string {
      do {
        var aPos: number = html.indexOf('<a', aPos+2)
        if (aPos > -1)
        {
          let hrefPos: number = html.indexOf('href="', aPos)
          let slices: string[] = [
            html.slice(0, hrefPos),
            'target="_blank" ',
            html.slice(hrefPos, hrefPos+6),
            "https://github.com/TimsManter/",
            (this.repo as any).name,
            "/blob/master/",
            html.slice(hrefPos+6)
          ]
          html = slices.join("")
        }
      }
      while (aPos > -1)
      return html
    }
  }
</script>

<style lang="scss">
</style>