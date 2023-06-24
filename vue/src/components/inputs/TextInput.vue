<template>
  <div class="w-full">
    <label
      v-if="label"
      for="input"
      class="block ml-1 text-xs font-medium text-left text-gray-700"
      data-test="label"
      >{{ label }}</label
    >
    <div class="relative mt-1">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <font-awesome-icon
          :icon="icon"
          :class="iconColor"
          class="text-sm fill-current"
          data-test="icon"
        >
        </font-awesome-icon>
      </div>
      <input
        v-model="input"
        :type="type"
        name="input"
        :class="inputClasses"
        class="block w-full text-sm border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
        :placeholder="placeholder"
        :disabled="disabled"
        :data-test="dataTest"
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
    icon: {
      type: Array as PropType<string[]>,
      default: null,
    },
    iconColor: {
      type: String as PropType<string>,
      default: "text-emerald-400",
    },
    type: {
      type: String as PropType<string>,
      default: "text",
    },
    dataTest: {
      type: String as PropType<string>,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const input = ref(props.modelValue);

    const inputClasses = computed(() => {
      let classes: string[] = [];

      if (props.disabled) classes.push("text-slate-400");
      if (props.icon) classes.push("pl-8");

      return classes.join(" ");
    });

    watch(input, () => {
      emit("update:modelValue", input.value);
    });

    return { input, inputClasses };
  },
});
</script>
