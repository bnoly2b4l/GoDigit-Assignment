<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import './App.scss'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions({
      setData: 'setData',
    }),
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('data')) || []
    this.setData(data)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  max-width: 1000px;
  margin: auto;
}
p {
  margin: 0;
}
.modal {
  font-family: Avenir, Helvetica, 'Kanit', sans-serif;
}
</style>
