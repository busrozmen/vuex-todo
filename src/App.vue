<template>
  <div>
    <navbar></navbar>
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import navbar from "./components/Navbar";
export default {
  components: {
    navbar
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500&display=swap');

body{
 font-family: 'Montserrat Alternates', sans-serif !important;
 background-color: #e2e2e2 !important;
}
</style>