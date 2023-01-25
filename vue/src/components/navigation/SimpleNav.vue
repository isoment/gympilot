<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <span v-if="!loggedIn">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </span>
    <span v-else>
      <a href="#" @click="logout()">Logout</a>
    </span>
  </nav>
</template>

<script lang="ts">
import { key } from "@/store";
import { LOGOUT_USER } from "@/store/constants";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SimpleNav",

  setup() {
    const store = useStore(key);
    const loggedIn = computed(() => store.state.isLoggedIn);

    const logout = () => {
      store.dispatch(LOGOUT_USER);
    };

    return { loggedIn, logout };
  },
});
</script>

<style scoped>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
