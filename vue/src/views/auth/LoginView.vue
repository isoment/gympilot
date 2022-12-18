<template>
  <div class="w-full flex items-center justify-center navbar-offset mt-8">
    <form
      class="w-full md:w-1/2 max-w-xl bg-white lg:border border-cool-gray-300 rounded-lg"
    >
      <div class="flex font-bold justify-center mb-3 lg:mb-4 lg:mt-12">
        <a href="#" class="focus:outline-emerald-400">
          <font-awesome-icon
            :icon="['fa', 'door-open']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </a>
      </div>
      <div class="px-12 pb-10">
        <h2 class="font-bold text-lg mb-5 text-gray-600 mt-4">Login</h2>
        <!-- Email -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'user']"
              class="input-icons fill-current text-emerald-400 text-xs z-10"
            >
            </font-awesome-icon>
            <input
              v-model="loginForm.email"
              type="email"
              name="email"
              placeholder="Email"
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-emerald-400"
            />
          </div>
          <div
            v-if="loginValidationError"
            class="text-xs text-red-400 mt-1 text-left ml-1"
          >
            {{ loginValidationError }}
          </div>
        </div>
        <!-- Password -->
        <div class="w-full mb-8 mt-5">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'lock']"
              class="input-icons fill-current text-emerald-400 text-xs z-10"
            ></font-awesome-icon>
            <input
              v-model="loginForm.password"
              name="password"
              type="password"
              placeholder="Password"
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-emerald-400"
            />
          </div>
        </div>
        <!-- Forgot Password -->
        <div>
          <a
            href="#"
            class="text-emerald-500 hover:text-emerald-400 transition-all duration-200 font-light focus:outline-emerald-400"
          >
            Forgot Your Password?
          </a>
        </div>
        <!-- Button -->
        <div class="mt-4">
          <button
            class="text-white font-bold bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 focus:outline-emerald-400 py-2 px-4 w-full"
            :disabled="loadingLoginAPI"
            @click.prevent="login()"
          >
            <span v-if="!loadingLoginAPI">Sign in</span>
            <span v-if="loadingLoginAPI"
              ><font-awesome-icon
                :icon="['fa', 'spinner']"
                class="animate-spin mr-1"
              ></font-awesome-icon>
              Sign in...
            </span>
          </button>
        </div>
        <!-- Register -->
        <div class="text-gray-500 mt-6 text-center">
          Don't have an account?
          <router-link
            :to="{ name: 'register' }"
            class="text-emerald-500 hover:text-emerald-400 transition-all duration-200 font-bold focus:outline-emerald-400"
            >Register</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "LoginView",

  setup() {
    const router = useRouter();

    // The login form state
    const loginForm = ref({
      email: "",
      password: "",
    });

    // Get the CSRF token that sanctum generates
    const sanctumToken = async () => {
      try {
        await axios.get(`http://localhost/sanctum/csrf-cookie`);
      } catch (err) {
        console.log(err);
      }
    };

    /********************
     *  Logic for login *
     *******************/
    const loadingLoginAPI = ref(false);
    const loginValidationError = ref("");

    const login = async () => {
      loadingLoginAPI.value = true;
      loginValidationError.value = "";
      await sanctumToken();
      try {
        let response = await axios.post(
          `http://localhost/api/login`,
          loginForm.value
        );
        console.log(response);
        if (response.status === 200) {
          router.push({ name: "home" });
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 422) {
            loginValidationError.value =
              "These credentials do not match our records";
          }
        }
      }
      loadingLoginAPI.value = false;
    };

    return { loginForm, login, loadingLoginAPI, loginValidationError };
  },
});
</script>

<style scoped>
.input-icons {
  margin-left: 0.85rem;
}
</style>
