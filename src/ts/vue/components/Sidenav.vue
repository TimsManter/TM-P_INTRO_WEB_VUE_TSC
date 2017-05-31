<template>
  <md-sidenav class="md-left" ref="mainSidenav">
    <md-layout md-column style="flex-wrap: nowrap;">
      <md-layout style="flex: 0 0 auto;">
        <tm-logo></tm-logo>
      </md-layout>
      <md-layout style="flex: 1 1 auto;">
        <md-list>
          <md-list-item>
            <router-link to="/projects">
              <md-icon md-iconset="mdi mdi-github-circle"></md-icon>
              <span>Projects</span>
            </router-link>
          </md-list-item>
          <md-list-item href="http://timsmanter.net/" target="_blank">
            <md-icon md-iconset="mdi mdi-newspaper"></md-icon>
            <span>Blog (PL)</span>
            <md-icon class="mdi-list-action" md-iconset="mdi mdi-open-in-new"></md-icon>
          </md-list-item>
          <md-list-item id="twitter-box">
            <md-icon md-iconset="mdi mdi-twitter"></md-icon>
            <span>Twitter</span>
            <md-list-expand>
              <a class="twitter-timeline" data-lang="en" data-link-color="#0097a7" data-chrome="noheader nofooter noborders transparent" href="https://twitter.com/TimsManter">Tweets by TimsManter</a>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </md-layout>
      <md-layout md-align="center" style="flex: 0 0 auto;">
        <span class="md-caption caption-span">
          Made with
          <md-icon class="caption-icon" md-iconset="mdi mdi-heart"></md-icon>
          using
          <a href="https://en.wikipedia.org/wiki/Free_and_open-source_software" target="_blank">FOSS</a>
        </span>
      </md-layout>
    </md-layout>
  </md-sidenav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import TmLogo from './TmLogo.vue'

  @Component({
    components: {
      'tm-logo': TmLogo
    }
  })
  export default class Sidenav extends Vue {
    $refs = {
      mainSidenav: VueMaterial.MdSidenav
    }

    mounted() {
      this.$on('openSidenav', function() {
        this.$refs.mainSidenav.open()
      })
    }
  }
</script>

<style lang="scss">
  .md-sidenav-content {
    @media (min-width: 1280px) {
      top: 0!important;
      pointer-events: auto!important;
      transform: translate3d(0, 0, 0)!important;
    }

    overflow-x: hidden !important;
    > .md-layout {
      height: 100%;
    }

    .caption-icon {
      font-size: 16px;
      width: 16px;
      min-width: 16px;
    }
    
    .caption-span {
      padding-bottom: 10px;
    }
  }

  #twitter-box {
    height: 48px;
    transition: height .4s cubic-bezier(.25,.8,.25,1);

    .md-list-expand {
      height: 100%;

      .md-list-expand-container {
        height: calc(100% - 48px);
        overflow-y: auto;
      }
    }
  }

  // Yes, I know I could use & selector but it does not compile for some reason.
  // TODO: Check & operator after sass-loader update.
  #twitter-box.md-active {
    height: 100%;
  }
</style>