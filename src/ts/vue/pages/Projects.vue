<template>
  <md-layout md-gutter md-align="center">
    <md-layout md-flex="50">
      <md-list class="md-divider">
        <md-list-item v-for="repo in repos" key="repo.id">
          <md-icon md-iconset="mdi mdi-git"></md-icon>
          <span>{{ repo.name }}</span>
        </md-list-item>
      </md-list>
    </md-layout>
    <md-snackbar ref="errorMessage" md-position="top right">
      <span>{{ snackbarMessage }}</span>
    </md-snackbar>
  </md-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import Component from 'vue-class-component'
  import Axios from 'axios'

  @Component
  export default class Sidenav extends Vue {
    repos = [];
    snackbarMessage: string = "No error"
    
    mounted() {
      Axios.get('/users/TimsManter/repos').then(response => {
        this.repos = response.data;
        this.snackbarMessage = response.statusText;
        (this.$refs.errorMessage as any).open();
      }).catch(error => {
        this.snackbarMessage = error;
        (this.$refs.errorMessage as any).open();
      })
    }

  }
</script>

<style lang="scss">
</style>