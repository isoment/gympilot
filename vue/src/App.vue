<template>
  <!-- <SimpleNav /> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import SimpleNav from "./components/navigation/SimpleNav.vue";

export default defineComponent({
  // components: { SimpleNav },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
