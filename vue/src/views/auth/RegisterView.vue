<template>
  <div>
    <GuestTopNavbar />
    <div class="flex justify-center w-full">
      <form class="w-full max-w-xl mt-20 bg-white rounded-lg md:w-1/2 lg:pt-8">
        <div class="flex justify-center mb-3 font-bold lg:mb-4 lg:mt-12">
          <font-awesome-icon
            :icon="['fa', 'user']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </div>
        <div class="px-12 pb-10">
          <h2 class="mb-5 text-lg font-bold text-slate-800">Sign up</h2>
          <!-- First Name -->
          <div class="w-full mb-6">
            <TextInput
              v-model="registerForm.first_name"
              placeholder="First Name"
              data-test="first-name-input"
              :icon="['fa', 'user']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="first_name"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Last Name -->
          <div class="w-full mb-6">
            <TextInput
              v-model="registerForm.last_name"
              placeholder="Last Name"
              data-test="last-name-input"
              :icon="['fa', 'user-tie']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="last_name"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Email -->
          <div class="w-full mb-6">
            <TextInput
              v-model="registerForm.email"
              placeholder="Email"
              type="email"
              data-test="email-input"
              :icon="['fa', 'envelope-square']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="email"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Password -->
          <div class="w-full mb-6">
            <TextInput
              v-model="registerForm.password"
              placeholder="Password"
              type="password"
              data-test="password-input"
              :icon="['fa', 'lock']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="password"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Confirm Password -->
          <div class="w-full mb-10">
            <TextInput
              v-model="registerForm.password_verify"
              placeholder="Confirm password"
              type="password"
              data-test="password-confirm-input"
              :icon="['fa', 'lock']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="password_verify"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Button -->
          <div class="mt-4">
            <button
              class="w-full px-4 py-2 font-bold text-white transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 focus:outline-slate-500"
              :disabled="loadingRegisterApi"
              data-test="submit-button"
              @click.prevent="attemptRegister()"
            >
              <span v-if="!loadingRegisterApi">Sign up</span>
              <span v-if="loadingRegisterApi"
                ><font-awesome-icon
                  :icon="['fa', 'spinner']"
                  class="mr-1 animate-spin"
                ></font-awesome-icon>
                Sign up...
              </span>
            </button>
          </div>
          <!-- Register -->
          <div class="mt-6 text-center text-gray-500">
            Already have an account?
            <router-link
              :to="{ name: 'login' }"
              class="font-bold transition-all duration-200 text-emerald-500 hover:text-emerald-400 focus:outline-slate-500"
              data-test="login-link"
            >
              Login
            </router-link>
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
import { APIAuthRegister } from "@/api/auth";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import { LOGIN_USER, ADD_TOAST } from "@/store/constants";
import GuestTopNavbar from "@/components/navigation/GuestTopNavbar.vue";
import TextInput from "@/components/inputs/TextInput.vue";

interface ApiValidationErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_verify?: string;
}

export default defineComponent({
  name: "RegisterView",

  components: {
    ValidationErrors,
    GuestTopNavbar,
    TextInput,
  },

  setup() {
    const router = useRouter();
    const store = useStore(key);

    const registerForm = ref({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_verify: "",
    });

    /***********************
     *  Logic for register *
     **********************/
    const loadingRegisterApi = ref(false);
    const registerValidationErrors = ref<ApiValidationErrors>({});

    const register = async () => {
      try {
        const response = await APIAuthRegister(registerForm.value);
        if (response.status === 201) {
          store.dispatch(LOGIN_USER);
          router.push({ name: "home" });
        }
      } catch (error: any) {
        if ((error as AxiosError)?.response?.status === 422) {
          if (error.response.data.errors) {
            registerValidationErrors.value = error.response.data.errors;
          } else {
            store.dispatch(ADD_TOAST, {
              type: "error",
              message: error.response.data.message,
            });
          }
        }
      }
    };

    const attemptRegister = async () => {
      loadingRegisterApi.value = true;
      registerValidationErrors.value = {};
      await register();
      loadingRegisterApi.value = false;
    };

    return {
      registerForm,
      loadingRegisterApi,
      attemptRegister,
      registerValidationErrors,
    };
  },
});
</script>

<style>
.input-icons {
  margin-left: 0.85rem;
}
</style>
