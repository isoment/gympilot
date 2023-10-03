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
          <h2 class="mb-5 text-lg font-bold text-gray-600">Sign up</h2>
          <!-- Name -->
          <div class="w-full mb-6">
            <!-- Maybe and required to API -->
            <TextInput
              v-model="registerForm.name"
              placeholder="Name"
              data-test="name-input"
              :icon="['fa', 'user']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="name"
              class="mt-2 text-left"
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
              class="mt-2 text-left"
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
              class="mt-2 text-left"
            />
          </div>
          <!-- Confirm Password -->
          <div class="w-full mb-10">
            <TextInput
              v-model="registerForm.password_confirmation"
              placeholder="Confirm password"
              type="password"
              data-test="password-confirm-input"
              :icon="['fa', 'lock']"
            />
            <ValidationErrors
              :errors="registerValidationErrors"
              field="password-confirmation"
              class="mt-2 text-left"
            />
          </div>
          <!-- Button -->
          <div class="mt-4">
            <button
              class="w-full px-4 py-2 font-bold text-white transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 focus:outline-emerald-400"
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
              class="font-bold transition-all duration-200 text-emerald-500 hover:text-emerald-400 focus:outline-emerald-400"
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
import { LOGIN_USER } from "@/store/constants";
import GuestTopNavbar from "@/components/navigation/GuestTopNavbar.vue";
import TextInput from "@/components/inputs/TextInput.vue";

interface ApiValidationErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
          registerValidationErrors.value = error.response.data.errors;
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
