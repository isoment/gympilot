<template>
  <div
    class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
  >
    <div>
      <div
        class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full"
      >
        <font-awesome-icon
          :icon="['fa', 'envelope-square']"
          class="text-xl text-emerald-400"
        >
        </font-awesome-icon>
      </div>
      <div class="mt-2 text-center sm:mt-5">
        <h4 as="h3" class="text-lg font-bold leading-6 text-slate-800">
          Password Reset
        </h4>
        <p class="mt-3 mb-6 text-sm text-left text-slate-500">
          Please enter your email and we will send you a link to reset your
          password.
        </p>
        <form class="mt-2">
          <div class="w-full mb-6">
            <TextInput
              v-model="form.email"
              placeholder="Email"
              :icon="['fa', 'user']"
              data-test="email-input"
            />
            <ValidationErrors
              :errors="validationErrors"
              field="email"
              class="mt-2 -mb-2 text-left"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="mt-5 sm:mt-8">
      <button
        type="button"
        class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        data-test="submit-button"
        @click="attemptRequestPasswordReset()"
      >
        Send Password Reset
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AxiosError } from "axios";
import { useStore } from "vuex";
import { key } from "@/store";
import { ADD_TOAST } from "@/store/constants";
import TextInput from "@/components/inputs/TextInput.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import { APIAuthForgotPassword } from "@/api/auth";

interface ResetValidationErrors {
  email?: string;
}

export default defineComponent({
  name: "ForgotPassword",

  components: {
    TextInput,
    ValidationErrors,
  },

  emits: ["close:forgot:password:modal"],

  setup(_, { emit }) {
    const store = useStore(key);

    const form = ref({ email: "" });
    const validationErrors = ref<ResetValidationErrors>({});

    const requestPasswordReset = async () => {
      try {
        await APIAuthForgotPassword(form.value);
        store.dispatch(ADD_TOAST, {
          type: "success",
          message: "Password reset instructions sent.",
        });
        emit("close:forgot:password:modal");
      } catch (error: any) {
        if ((error as AxiosError)?.response?.status === 422) {
          if (error.response.data.errors) {
            validationErrors.value = error.response.data.errors;
            return;
          } else if (error.response.data.message) {
            validationErrors.value = { email: error.response.data.message };
            return;
          }
        }
        store.dispatch(ADD_TOAST, {
          type: "error",
          message: "There was an error resetting password",
        });
        emit("close:forgot:password:modal");
      }
    };

    const attemptRequestPasswordReset = async () => {
      validationErrors.value = {};
      await requestPasswordReset();
    };

    return { validationErrors, form, attemptRequestPasswordReset };
  },
});
</script>
