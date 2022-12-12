<template>
  <div class="w-full flex items-center justify-center navbar-offset mt-8">
    <form
      class="w-full md:w-1/2 max-w-xl bg-white lg:border border-cool-gray-300 rounded-lg"
    >
      <!-- <div class="flex font-bold justify-center mb-3 lg:mb-4 lg:mt-12">
        <router-link :to="{ name: 'main-page' }">
          <i class="fas fa-car text-7xl text-emerald-400"></i>
        </router-link>
      </div> -->
      <div class="px-12 pb-10">
        <h2 class="font-bold text-lg mb-5 text-gray-600 mt-4">Sign In</h2>
        <!-- Email -->
        <div class="w-full mb-4">
          <div class="flex items-center">
            <i
              class="ml-3 fill-current text-emerald-400 text-xs z-10 fas fa-user"
            ></i>
            <input
              v-model="loginForm.email"
              type="email"
              name="email"
              placeholder="Email"
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <!-- Password -->
        <div class="w-full mb-4">
          <div class="flex items-center">
            <i
              class="ml-3 fill-current text-emerald-400 text-xs z-10 fas fa-lock"
            ></i>
            <input
              v-model="loginForm.password"
              name="password"
              type="password"
              placeholder="Password"
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <!-- Forgot Password -->
        <div>
          <a
            href="#"
            class="text-emerald-500 hover:text-emerald-400 transition-all duration-200 font-light"
          >
            Forgot Your Password?
          </a>
        </div>
        <!-- Button -->
        <div class="mt-4">
          <!-- <button
            class="text-white font-bold bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 focus:outline-none py-2 px-4 w-full"
            :disabled="loading"
            @click.prevent="login"
          >
            <span v-if="!loading">Login</span>
            <span v-if="loading"
              ><i class="fas fa-spinner fa-spin"></i> Login...
            </span>
          </button> -->
          <button
            class="text-white font-bold bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 focus:outline-none py-2 px-4 w-full"
            @click.prevent="login()"
          >
            Login
          </button>
        </div>
        <!-- Register -->
        <div class="text-gray-500 mt-6 text-center">
          Don't have an account?
          <a
            href="#"
            class="text-emerald-500 hover:text-emerald-400 transition-all duration-200 font-bold"
          >
            Register
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginView",

  setup() {
    // The login form state
    let loginForm = ref({
      email: "",
      password: "",
    });

    // Get the CSRF token from sanctum
    const sanctumToken = async () => {
      try {
        await axios.get(`http://localhost/sanctum/csrf-cookie`);
      } catch (err) {
        console.log(err);
      }
    };

    // Login to the application
    const login = async () => {
      try {
        let response = await axios.post(
          `http://localhost/api/login`,
          loginForm.value
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      sanctumToken();
    });

    return { loginForm, login };
  },
});
</script>
