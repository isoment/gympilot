<template>
  <div class="w-full flex items-center justify-center navbar-offset mt-8">
    <form
      class="w-full md:w-1/2 max-w-xl bg-white lg:border border-cool-gray-300 rounded-lg"
    >
      <div class="flex font-bold justify-center mb-3 lg:mb-4 lg:mt-12">
        <router-link :to="{ name: 'home' }">
          <font-awesome-icon
            :icon="['fa', 'user']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </router-link>
      </div>
      <div class="px-12 pb-10">
        <h2 class="font-bold text-lg mb-5 text-gray-600">Sign Up</h2>
        <!-- Name -->
        <div class="w-full mb-4">
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
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <!-- Email -->
        <div class="w-full mb-4">
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
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <!-- Password -->
        <div class="w-full mb-4">
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
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <!-- Confirm Password -->
        <div class="w-full mb-4">
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
              class="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <!-- Button -->
        <div class="mt-4">
          <button
            class="text-white font-bold bg-emerald-500 hover:bg-emerald-400 transition-all duration-200 focus:outline-none py-2 px-4 w-full"
            :disabled="loadingRegisterApi"
            @click="register()"
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
            class="text-emerald-500 hover:text-emerald-400 transition-all duration-200 font-bold"
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
// import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterView",

  setup() {
    // const router = useRouter();

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
    const register = async () => {};

    return { registerForm, loadingRegisterApi, register };
  },
});
</script>

<style>
.input-icons {
  margin-left: 0.85rem;
}
</style>
