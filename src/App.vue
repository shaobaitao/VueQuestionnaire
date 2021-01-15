<template>
  <div id="app">
<!--    <router-link to="/">首页</router-link>-->
<!--    <router-link to="/about">关于</router-link>-->
<!--    <router-link to="/questionnaire">问卷</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Myform from './components/Myform'

export default {
  name: 'App',
  components: {
    // HelloWorld,

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  color: #2c3e50;

}
html{
  height: 100%;
  width: 100%;
}
body{
  height: 100%;
  width: 100%;
}
</style>
