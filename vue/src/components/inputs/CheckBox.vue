<template>
  <div class="flex items-center">
    <input
      v-model="isChecked"
      type="checkbox"
      class="w-5 h-5 border-gray-400 rounded text-emerald-500 focus:ring-emerald-400"
      aria-describedby="checkbox-label"
      @change="onChange"
      @click="onClick"
    />
    <label id="checkbox-label" class="ml-2 font-mono">{{ label }}</label>
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

  emits: ["update:modelValue", "click"],

  setup(props, { emit }) {
    const isChecked = ref(props.modelValue);

    const onChange = () => {
      emit("update:modelValue", isChecked.value);
    };

    const onClick = (event: MouseEvent) => {
      emit("click", event);
    };

    return {
      onChange,
      onClick,
      isChecked,
    };
  },
});
</script>

<style scoped>
#checkbox-label {
  padding-top: 2px;
}
</style>
