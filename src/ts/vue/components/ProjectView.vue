<template>
  <md-tabs>
    <md-tab md-label="Readme">
      <project-readme :repo="repo"></project-readme>
    </md-tab>
  </md-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import ProjectReadme from '../components/ProjectReadme.vue'

  @Component({
    components: {
      'project-readme': ProjectReadme
    },
    props: {
      repo: Object
    }
  })
  export default class ProjectsView extends Vue {

    // mounted() {
    //   (this.$refs['readmeTab'] as any).$on('readmeTab', () => {
    //     this.simulateClick()
    //   })
    // }

    // simulateClick() {
    //   var evt = document.createEvent("MouseEvents");
    //   evt.initMouseEvent("click", true, true, window,
    //     0, 0, 0, 0, 0, false, false, false, false, 0, null);
    //   var bt = document.getElementById('readmeTab').parentNode.parentNode.parentNode.firstChild.firstChild
    //   var canceled = !bt.dispatchEvent(evt);
    //   if(canceled) {
    //     // A handler called preventDefault
    //     alert("canceled");
    //   } else {
    //     // None of the handlers called preventDefault
    //     alert("not canceled");
    //   }
    // }
  }
</script>