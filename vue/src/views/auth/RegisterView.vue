<template>
  <div class="flex items-center justify-center w-full mt-8 navbar-offset">
    <form
      class="w-full max-w-xl bg-white rounded-lg md:w-1/2 lg:border border-cool-gray-300"
    >
      <div class="flex justify-center mb-3 font-bold lg:mb-4 lg:mt-12">
        <router-link :to="{ name: 'home' }" class="focus:outline-emerald-400">
          <font-awesome-icon
            :icon="['fa', 'user']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </router-link>
      </div>
      <div class="px-12 pb-10">
        <h2 class="mb-5 text-lg font-bold text-gray-600">Register</h2>
        <!-- Name -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'user']"
              class="z-10 text-xs fill-current input-icons text-emerald-400"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.name"
              type="text"
              name="name"
              placeholder="Name"
              required
              class="w-full px-8 py-2 -mx-6 text-gray-700 border rounded focus:outline-emerald-400"
              data-test="name-input"
            />
          </div>
          <ValidationErrors
            :errors="registerValidationErrors"
            field="name"
            class="mt-2 text-left"
          />
        </div>
        <!-- Email -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'envelope-square']"
              class="z-10 text-xs fill-current input-icons text-emerald-400"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.email"
              name="email"
              placeholder="Email"
              required
              class="w-full px-8 py-2 -mx-6 text-gray-700 border rounded focus:outline-emerald-400"
              data-test="email-input"
            />
          </div>
          <ValidationErrors
            :errors="registerValidationErrors"
            field="email"
            class="mt-2 text-left"
          />
        </div>
        <!-- Password -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'lock']"
              class="z-10 text-xs fill-current input-icons text-emerald-400"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.password"
              name="password"
              type="password"
              placeholder="Password"
              class="w-full px-8 py-2 -mx-6 text-gray-700 border rounded focus:outline-emerald-400"
              data-test="password-input"
            />
          </div>
          <ValidationErrors
            :errors="registerValidationErrors"
            field="password"
            class="mt-2 text-left"
          />
        </div>
        <!-- Confirm Password -->
        <div class="w-full mb-10">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'lock']"
              class="z-10 text-xs fill-current input-icons text-emerald-400"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Re-type password"
              class="w-full px-8 py-2 -mx-6 text-gray-700 border rounded focus:outline-emerald-400"
              data-test="password-confirm-input"
            />
          </div>
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
          >
            Login
          </router-link>
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
import { AxiosError } from "axios";
import { APIAuthRegister, APIAuthCsrf } from "@/api/auth";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import { LOGIN_USER } from "@/store/constants";

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
        await APIAuthCsrf();
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
