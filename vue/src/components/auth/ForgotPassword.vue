<template>
  <div
    class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
  >
    <div>
      <div
        class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full"
      >
        <font-awesome-icon
          :icon="['fa', 'check']"
          class="text-xl text-emerald-400"
        >
        </font-awesome-icon>
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <DialogTitle
          as="h3"
          class="text-lg font-medium leading-6 text-gray-900"
        >
          Password Reset
        </DialogTitle>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6">
      <button
        type="button"
        class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
      >
        Send Email
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DialogTitle } from "@headlessui/vue";

export default defineComponent({
  name: "SingleModal",

  components: {
    DialogTitle,
  },

  props: {},

  emits: ["update:modelValue"],

  setup() {
    return {};
  },
});
</script>
