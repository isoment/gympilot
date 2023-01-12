<template>
  <div class="w-full flex items-center justify-center navbar-offset mt-8">
    <form
      class="w-full md:w-1/2 max-w-xl bg-white lg:border border-cool-gray-300 rounded-lg"
    >
      <div class="flex font-bold justify-center mb-3 lg:mb-4 lg:mt-12">
        <router-link :to="{ name: 'home' }" class="focus:outline-emerald-400">
          <font-awesome-icon
            :icon="['fa', 'user']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </router-link>
      </div>
      <div class="px-12 pb-10">
        <h2 class="font-bold text-lg mb-5 text-gray-600">Register</h2>
        <!-- Name -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'user']"
              class="input-icons fill-current text-emerald-400 text-xs z-10"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.name"
              type="text"
              name="name"
              placeholder="Name"
              required
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-emerald-400"
            />
          </div>
          <ValidationErrors :errors="errorFor('name')" class="text-left mt-2" />
        </div>
        <!-- Email -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'envelope-square']"
              class="input-icons fill-current text-emerald-400 text-xs z-10"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.email"
              name="email"
              placeholder="Email"
              required
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-emerald-400"
            />
          </div>
          <ValidationErrors
            :errors="errorFor('email')"
            class="text-left mt-2"
          />
        </div>
        <!-- Password -->
        <div class="w-full mb-6">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'lock']"
              class="input-icons fill-current text-emerald-400 text-xs z-10"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.password"
              name="password"
              type="password"
              placeholder="Password"
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-emerald-400"
            />
          </div>
          <ValidationErrors
            :errors="errorFor('password')"
            class="text-left mt-2"
          />
        </div>
        <!-- Confirm Password -->
        <div class="w-full mb-10">
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fa', 'lock']"
              class="input-icons fill-current text-emerald-400 text-xs z-10"
            >
            </font-awesome-icon>
            <input
              v-model="registerForm.password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Re-type password"
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-emerald-400"
            />
          </div>
          <ValidationErrors
            :errors="errorFor('password_confirmation')"
            class="text-left mt-2"
          />
        </div>
        <!-- Button -->
        <div class="mt-4">
          <button
            class="text-white font-bold bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 focus:outline-emerald-400 py-2 px-4 w-full"
            :disabled="loadingRegisterApi"
            @click="attemptRegister()"
          >
            <span v-if="!loadingRegisterApi">Sign up</span>
            <span v-if="loadingRegisterApi"
              ><font-awesome-icon
                :icon="['fa', 'spinner']"
                class="animate-spin mr-1"
              ></font-awesome-icon>
              Sign up...
            </span>
          </button>
        </div>
        <!-- Register -->
        <div class="text-gray-500 mt-6 text-center">
          Already have an account?
          <router-link
            :to="{ name: 'login' }"
            class="text-emerald-500 hover:text-emerald-400 transition-all duration-200 font-bold focus:outline-emerald-400"
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
import axios from "axios";
import { useRouter } from "vue-router";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import { APIAuthRegister, APIAuthCsrf } from "@/api/auth";

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

    const registerForm = ref({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    // Get the CSRF token that sanctum generates
    const getSanctumCsrf = async () => {
      try {
        await APIAuthCsrf();
      } catch (error) {
        console.log(error);
      }
    };

    /***********************
     *  Logic for register *
     **********************/
    const loadingRegisterApi = ref(false);
    const registerValidationErrors = ref<ApiValidationErrors>({});

    const attemptRegister = async () => {
      loadingRegisterApi.value = true;
      registerValidationErrors.value = {};
      await getSanctumCsrf();

      // Make a call to the register api endpoint
      APIAuthRegister(registerForm.value)
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "home" });
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            console.log(error.response);
            if (error.response.status === 422) {
              registerValidationErrors.value = error.response.data.errors;
            }
          }
        });

      loadingRegisterApi.value = false;
    };

    const errorFor = (field: string) => {
      const valuesOfErrors = registerValidationErrors.value;
      return valuesOfErrors[field as keyof ApiValidationErrors]
        ? valuesOfErrors[field as keyof ApiValidationErrors]
        : [];
    };

    return {
      registerForm,
      loadingRegisterApi,
      attemptRegister,
      errorFor,
    };
  },
});
</script>

<style>
.input-icons {
  margin-left: 0.85rem;
}
</style>
