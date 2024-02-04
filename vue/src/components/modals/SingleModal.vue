<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed inset-0 z-10 overflow-y-auto"
      @close="closeModal"
    >
      <div
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 transition-opacity bg-gray-600 bg-opacity-75"
          />
        </TransitionChild>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="span"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <slot></slot>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { PropType, defineComponent, watch, ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default defineComponent({
  name: "SingleModal",

  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const open = ref(props.modelValue);

    // Watch for changes in props.modelValue and update the local state
    watch(
      () => props.modelValue,
      (newValue) => {
        open.value = newValue;
      }
    );

    const closeModal = () => {
      open.value = false;
      emit("update:modelValue", open.value);
    };

    return {
      open,
      closeModal,
    };
  },
});
</script>
