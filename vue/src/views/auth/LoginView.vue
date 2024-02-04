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
          <h2 class="mt-4 mb-5 text-lg font-bold text-slate-800">Sign in</h2>
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
              @click="openPasswordResetModal"
            >
              Forgot Your Password?
            </a>
            <SingleModal v-model="showPasswordResetModal">
              <ForgotPassword
                @close:forgot:password:modal="closePasswordResetModal"
              ></ForgotPassword>
            </SingleModal>
          </div>
          <!-- Button -->
          <div class="mt-4">
            <ButtonPrimary
              color="bg-emerald-400"
              hover="hover:bg-emerald-300"
              data-test="submit-button"
              :disabled="loadingLoginAPI"
              :loading="loadingLoginAPI"
              @click.prevent="attemptLogin()"
              >Sign In</ButtonPrimary
            >
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
import {
  LOGIN_USER,
  ADD_TOAST,
  UNSET_SESSION_EXPIRED_LAST_ROUTE,
} from "@/store/constants";
import GuestTopNavbar from "@/components/navigation/GuestTopNavbar.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import ButtonPrimary from "@/components/buttons/ButtonPrimary.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import SingleModal from "@/components/modals/SingleModal.vue";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";

interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export default defineComponent({
  name: "LoginView",

  components: {
    GuestTopNavbar,
    TextInput,
    ButtonPrimary,
    ValidationErrors,
    SingleModal,
    ForgotPassword,
  },

  setup() {
    const router = useRouter();
    const store = useStore(key);

    /********************
     *  Logic for login *
     *******************/
    const loginForm = ref({
      email: "",
      password: "",
    });

    const loadingLoginAPI = ref(false);
    const loginValidationErrors = ref<LoginValidationErrors>({});

    const login = async () => {
      try {
        const response = await APIAuthLogin(loginForm.value);
        const accessToken = response.headers["authorization"];
        if (accessToken) {
          store.dispatch(LOGIN_USER, accessToken);
          const route = store.state.sessionExpiredLastRoute ?? "/dashboard";
          router.push(route);
          store.commit(UNSET_SESSION_EXPIRED_LAST_ROUTE);
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
            resetLoginForm();
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

    const resetLoginForm = () => {
      loginForm.value.email = "";
      loginForm.value.password = "";
    };

    /*****************************
     *  Logic for Password Reset *
     *****************************/

    const showPasswordResetModal = ref(false);

    const openPasswordResetModal = () => {
      showPasswordResetModal.value = true;
    };

    const closePasswordResetModal = () => {
      showPasswordResetModal.value = false;
    };

    return {
      loginForm,
      attemptLogin,
      loadingLoginAPI,
      loginValidationErrors,
      showPasswordResetModal,
      openPasswordResetModal,
      closePasswordResetModal,
    };
  },
});
</script>

<style scoped>
.input-icons {
  margin-left: 0.85rem;
}
</style>
