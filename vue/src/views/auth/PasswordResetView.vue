<template>
  <div>
    <GuestTopNavbar />
    <div class="flex justify-center w-full">
      <form class="w-full max-w-xl bg-white rounded-lg mt-36 md:w-1/2 lg:pt-8">
        <div class="flex justify-center mb-3 font-bold lg:mb-4">
          <font-awesome-icon
            :icon="['fa', 'lock']"
            class="text-6xl text-emerald-400"
          >
          </font-awesome-icon>
        </div>
        <div class="px-12 pb-10">
          <h2 class="mt-4 mb-5 text-lg font-bold text-slate-800">
            Password Reset
          </h2>
          <!-- Password -->
          <div class="w-full mb-6">
            <TextInput
              v-model="passwordResetForm.password"
              placeholder="New Password"
              type="password"
              data-test="password-input"
              :icon="['fa', 'lock']"
            />
            <ValidationErrors
              :errors="passwordResetValidationErrors"
              field="password"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <!-- Confirm Password -->
          <div class="w-full mb-10">
            <TextInput
              v-model="passwordResetForm.password_verify"
              placeholder="Confirm password"
              type="password"
              data-test="password-confirm-input"
              :icon="['fa', 'lock']"
            />
            <ValidationErrors
              :errors="passwordResetValidationErrors"
              field="password_verify"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <div class="mt-4">
            <button
              class="w-full px-4 py-2 font-bold text-white transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 focus:outline-slate-500"
              :disabled="loadingResetApi"
              data-test="submit-button"
              @click.prevent="attemptPasswordReset()"
            >
              <span v-if="!loadingResetApi">Reset Password</span>
              <span v-if="loadingResetApi"
                ><font-awesome-icon
                  :icon="['fa', 'spinner']"
                  class="mr-1 animate-spin"
                ></font-awesome-icon>
                Resetting Password...
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import { ADD_TOAST } from "@/store/constants";
import { APIAuthResetPassword } from "@/api/auth";
import { AxiosError } from "axios";
import GuestTopNavbar from "@/components/navigation/GuestTopNavbar.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import router from "@/router";

interface PasswordResetValidationErrors {
  password?: string;
  password_verify?: string;
}

export default defineComponent({
  name: "PasswordResetView",

  components: { GuestTopNavbar, TextInput, ValidationErrors },

  setup() {
    const route = useRoute();
    const store = useStore(key);

    const resetToken = ref("");

    const passwordResetForm = ref({
      password: "",
      password_verify: "",
    });

    const passwordResetValidationErrors = ref<PasswordResetValidationErrors>(
      {}
    );

    const loadingResetApi = ref(false);

    onMounted(() => {
      const token = route.params.token;
      if (typeof token === "string") {
        resetToken.value = token;
      } else {
        store.dispatch(ADD_TOAST, {
          type: "error",
          message: "The reset token is invalid",
        });
      }
    });

    const resetPassword = async () => {
      try {
        await APIAuthResetPassword(resetToken.value, passwordResetForm.value);
        router.push({ name: "login" });
        store.dispatch(ADD_TOAST, {
          type: "success",
          message: "Your password was reset. Please login",
        });
      } catch (error: any) {
        if ((error as AxiosError)?.response?.status === 422) {
          if (error.response.data.errors) {
            passwordResetValidationErrors.value = error.response.data.errors;
          } else {
            store.dispatch(ADD_TOAST, {
              type: "error",
              message: error.response.data.message,
            });
            router.push({ name: "login" });
          }
        }
      }
    };

    const attemptPasswordReset = async () => {
      passwordResetValidationErrors.value = {};
      loadingResetApi.value = true;
      await resetPassword();
      loadingResetApi.value = false;
    };

    return {
      passwordResetForm,
      passwordResetValidationErrors,
      loadingResetApi,
      attemptPasswordReset,
    };
  },
});
</script>
