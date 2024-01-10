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
        <DialogTitle as="h3" class="text-lg font-bold leading-6 text-slate-800">
          Password Reset
        </DialogTitle>
        <p class="mt-3 mb-6 text-sm text-left text-slate-500">
          Please enter your email and we will send you a link to reset your
          password.
        </p>
        <form class="mt-2">
          <div class="w-full mb-6">
            <TextInput
              v-model="email"
              placeholder="Email"
              :icon="['fa', 'user']"
              data-test="email-input"
            />
            <ValidationErrors
              :errors="validationError"
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
      >
        Send Password Reset
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { DialogTitle } from "@headlessui/vue";
import TextInput from "../inputs/TextInput.vue";
import ValidationErrors from "../shared/ValidationErrors.vue";

interface ResetValidationErrors {
  email?: string;
}

export default defineComponent({
  name: "SingleModal",

  components: {
    DialogTitle,
    TextInput,
    ValidationErrors,
  },

  props: {},

  emits: ["update:modelValue"],

  setup() {
    const email = ref("");
    const validationError = ref<ResetValidationErrors>({});

    return { validationError, email };
  },
});
</script>
