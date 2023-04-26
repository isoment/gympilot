<template>
  <div class="flex items-center">
    <input
      v-model="isChecked"
      type="checkbox"
      class="w-5 h-5"
      @change="onChange"
    />
    <label class="ml-2 font-mono font-bold">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CheckBox",

  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const isChecked = ref(props.modelValue);

    const onChange = () => {
      emit("update:modelValue", isChecked.value);
    };

    return {
      onChange,
      isChecked,
    };
  },
});
</script>
