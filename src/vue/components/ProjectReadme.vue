<template>
  <md-layout md-column v-html="descHtml"></md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import { Component, Watch, Prop } from 'vue-ts-decorate';
  import Axios from 'axios'
  import Marked from 'marked'

  @Component()
  export default class ProjectReadme extends Vue {
    @Prop()
    desc: string
    @Prop()
    name: string
    
    get descHtml() {
      return this.prefixLinks(Marked(this.desc))
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
            this.name,
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
          if (html.charAt(hrefPos+6) == '#') {
            continue
          }
          let slices: string[] = [
            html.slice(0, hrefPos),
            'target="_blank" ',
            html.slice(hrefPos, hrefPos+6),
            "https://github.com/TimsManter/",
            this.name,
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