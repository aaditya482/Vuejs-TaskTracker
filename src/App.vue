<template>
  <MainNavbar />
  <router-view/>
</template>

<script>
  import MainNavbar from './components/MainNavbar.vue';
  export default{
    components: { MainNavbar }
}
</script>

<style>
  *{
    font-family: 'Poppins', sans-serif;
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
