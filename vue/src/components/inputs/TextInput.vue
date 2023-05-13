<template>
  <div>
    <label
      v-if="label"
      for="input"
      class="block ml-1 text-xs font-medium text-left text-gray-700"
      >{{ label }}</label
    >
    <div class="mt-1">
      <input
        id="input"
        v-model="input"
        type="text"
        name="input"
        :class="disabledClasses"
        class="block w-full text-sm border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-slate-500"
        :placeholder="placeholder"
        :disabled="isDisabled"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TextInput",

  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    label: {
      type: String as PropType<string>,
      default: null,
    },
    placeholder: {
      type: String as PropType<string>,
      default: null,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const input = ref(props.modelValue);
    const isDisabled = ref(props.disabled);

    const disabledClasses = computed(() => {
      return isDisabled.value ? "text-slate-400" : "";
    });

    watch(input, () => {
      emit("update:modelValue", input.value);
    });

    return { input, isDisabled, disabledClasses };
  },
});
</script>
