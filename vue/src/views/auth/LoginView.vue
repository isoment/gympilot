<template>
  <div>
    <GuestTopNavbar />
    <div class="flex justify-center w-full">
      <form class="w-full max-w-xl bg-white rounded-lg mt-36 md:w-1/2 lg:pt-8">
        <div class="flex justify-center mb-3 font-bold lg:mb-4">
          <font-awesome-icon
            :icon="['fa', 'door-open']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </div>
        <div class="px-12 pb-10">
          <h2 class="mt-4 mb-5 text-lg font-bold text-gray-600">Sign in</h2>
          <!-- Email -->
          <div class="w-full mb-6">
            <TextInput
              v-model="loginForm.email"
              placeholder="Email"
              :icon="['fa', 'user']"
              data-test="email-input"
            />
            <ValidationErrors
              :errors="loginValidationErrors"
              field="email"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Password -->
          <div class="w-full mt-5">
            <TextInput
              v-model="loginForm.password"
              placeholder="Password"
              :icon="['fa', 'lock']"
              type="password"
              data-test="password-input"
            />
            <ValidationErrors
              :errors="loginValidationErrors"
              field="password"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Forgot Password -->
          <div class="mt-7">
            <a
              href="#"
              class="font-light transition-all duration-200 text-emerald-500 hover:text-emerald-400 focus:outline-emerald-400"
              data-test="forgot-password-link"
            >
              Forgot Your Password?
            </a>
          </div>
          <!-- Button -->
          <div class="mt-4">
            <button
              class="w-full px-4 py-2 font-bold text-white transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 focus:outline-emerald-400"
              :disabled="loadingLoginAPI"
              data-test="submit-button"
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
              data-test="register-link"
              >Sign up</router-link
            >
          </div>
          <div class="mt-6 text-center text-gray-500">
            <router-link
              :to="{ name: 'protected-endpoint-test' }"
              class="text-emerald-500"
              >Protected Endpoint Test</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import { AxiosError } from "axios";
import { APIAuthLogin } from "@/api/auth";
import { LOGIN_USER, ADD_TOAST } from "@/store/constants";
import GuestTopNavbar from "@/components/navigation/GuestTopNavbar.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";

interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export default defineComponent({
  name: "LoginView",

  components: { GuestTopNavbar, TextInput, ValidationErrors },

  setup() {
    const router = useRouter();
    const store = useStore(key);

    const loginForm = ref({
      email: "",
      password: "",
    });

    /********************
     *  Logic for login *
     *******************/
    const loadingLoginAPI = ref(false);
    const loginValidationErrors = ref<LoginValidationErrors>({});

    const login = async () => {
      try {
        const response = await APIAuthLogin(loginForm.value);
        const accessToken = response.headers["authorization"];
        if (accessToken) {
          store.dispatch(LOGIN_USER, accessToken);
          router.push({ name: "home" });
        } else {
          store.dispatch(ADD_TOAST, {
            type: "error",
            message: "Invalid access token",
          });
        }
      } catch (error: any) {
        if ((error as AxiosError)?.response?.status === 422) {
          if (error.response.data.errors) {
            loginValidationErrors.value = error.response.data.errors;
          } else {
            store.dispatch(ADD_TOAST, {
              type: "error",
              message: error.response.data.message,
            });
          }
        }
      }
    };

    const attemptLogin = async () => {
      loadingLoginAPI.value = true;
      loginValidationErrors.value = {};
      await login();
      loadingLoginAPI.value = false;
    };

    return { loginForm, attemptLogin, loadingLoginAPI, loginValidationErrors };
  },
});
</script>

<style scoped>
.input-icons {
  margin-left: 0.85rem;
}
</style>
