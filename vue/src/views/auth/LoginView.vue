<template>
  <div class="flex items-center justify-center w-full mt-8 navbar-offset">
    <form
      class="w-full max-w-xl bg-white rounded-lg md:w-1/2 lg:border border-cool-gray-300"
    >
      <div class="flex justify-center mb-3 font-bold lg:mb-4 lg:mt-12">
        <a href="#" class="focus:outline-emerald-400">
          <font-awesome-icon
            :icon="['fa', 'door-open']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </a>
      </div>
      <div class="px-12 pb-10">
        <h2 class="mt-4 mb-5 text-lg font-bold text-gray-600">Login</h2>
        <!-- Email -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'user']"
              class="z-10 text-xs fill-current input-icons text-emerald-400"
            >
            </font-awesome-icon>
            <input
              v-model="loginForm.email"
              type="email"
              name="email"
              placeholder="Email"
              class="w-full px-8 py-2 -mx-6 text-gray-700 border rounded focus:outline-emerald-400"
            />
          </div>
          <div
            v-if="loginValidationError"
            class="mt-2 ml-1 text-xs text-left text-red-400"
          >
            {{ loginValidationError }}
          </div>
        </div>
        <!-- Password -->
        <div class="w-full mt-5 mb-8">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'lock']"
              class="z-10 text-xs fill-current input-icons text-emerald-400"
            ></font-awesome-icon>
            <input
              v-model="loginForm.password"
              name="password"
              type="password"
              placeholder="Password"
              class="w-full px-8 py-2 -mx-6 text-gray-700 border rounded focus:outline-emerald-400"
            />
          </div>
        </div>
        <!-- Forgot Password -->
        <div>
          <a
            href="#"
            class="font-light transition-all duration-200 text-emerald-500 hover:text-emerald-400 focus:outline-emerald-400"
          >
            Forgot Your Password?
          </a>
        </div>
        <!-- Button -->
        <div class="mt-4">
          <button
            class="w-full px-4 py-2 font-bold text-white transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 focus:outline-emerald-400"
            :disabled="loadingLoginAPI"
            @click.prevent="attemptLogin()"
          >
            <span v-if="!loadingLoginAPI">Sign in</span>
            <span v-if="loadingLoginAPI"
              ><font-awesome-icon
                :icon="['fa', 'spinner']"
                class="mr-1 animate-spin"
              ></font-awesome-icon>
              Sign in...
            </span>
          </button>
        </div>
        <!-- Register -->
        <div class="mt-6 text-center text-gray-500">
          Don't have an account?
          <router-link
            :to="{ name: 'register' }"
            class="font-bold transition-all duration-200 text-emerald-500 hover:text-emerald-400 focus:outline-emerald-400"
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
import { useStore } from "vuex";
import { key } from "@/store";
import axios from "axios";
import { APIAuthLogin, APIAuthCsrf } from "@/api/auth";
import { LOGIN_USER } from "@/store/constants";

export default defineComponent({
  name: "LoginView",

  setup() {
    const router = useRouter();
    const store = useStore(key);

    // The login form state
    const loginForm = ref({
      email: "",
      password: "",
    });

    // Get the CSRF token that sanctum generates
    const getSanctumCsrf = async () => {
      try {
        await APIAuthCsrf();
      } catch (error) {
        console.log(error);
      }
    };

    /********************
     *  Logic for login *
     *******************/
    const loadingLoginAPI = ref(false);
    const loginValidationError = ref("");

    const attemptLogin = async () => {
      loadingLoginAPI.value = true;
      loginValidationError.value = "";
      await getSanctumCsrf();

      // Make a call to the login api endpoint, if the response is successful
      // call the vuex store to set the local storage and global state.
      APIAuthLogin(loginForm.value)
        .then((response) => {
          if (response.status === 200) {
            store.dispatch(LOGIN_USER);
            router.push({ name: "home" });
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 422) {
              loginValidationError.value =
                "These credentials do not match our records";
            }
          }
        });

      loadingLoginAPI.value = false;
    };

    return { loginForm, attemptLogin, loadingLoginAPI, loginValidationError };
  },
});
</script>

<style scoped>
.input-icons {
  margin-left: 0.85rem;
}
</style>
