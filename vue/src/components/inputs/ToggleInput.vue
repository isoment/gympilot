<template>
  <div :class="wrapperClasses()" class="flex">
    <label :for="label" :class="labelClasses()">{{ label }}</label>
    <Switch
      v-model="toggle"
      :name="label"
      :disabled="disabled"
      :class="[
        toggle ? 'bg-emerald-400' : 'bg-gray-200',
        size === 'large' ? 'h-8' : 'h-6',
        size === 'large' ? 'w-16' : 'w-11',
        'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
      ]"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="[
          buttonTranslateClass(),
          size === 'large' ? 'h-7' : 'h-5',
          size === 'large' ? 'w-7' : 'w-5',
          'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        ]"
      />
    </Switch>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { Switch } from "@headlessui/vue";

interface LabelPositionOptions {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

export default defineComponent({
  name: "ToggleInput",

  components: {
    Switch,
  },

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    label: {
      type: String as PropType<string>,
      default: "Toggle switch",
    },
    labelPosition: {
      type: String as PropType<string>,
      default: "top",
      validator: (value: string) => {
        const position = ["top", "bottom", "left", "right"];
        return position.includes(value);
      },
    },
    size: {
      type: String as PropType<string>,
      default: "base",
      validator: (value: string) => {
        const size = ["base", "large"];
        return size.includes(value);
      },
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const toggle = ref(props.modelValue);

    watch(toggle, () => {
      emit("update:modelValue", toggle.value);
    });

    const buttonTranslateClass = (): string => {
      if (toggle.value) {
        return props.size === "large" ? "translate-x-8" : "translate-x-5";
      } else {
        return "translate-x-0";
      }
    };

    const wrapperClasses = (): string => {
      const fields: LabelPositionOptions = {
        top: "flex-col items-start",
        bottom: "flex-col-reverse items-start",
        left: "flex-row items-center",
        right: "flex-row-reverse items-center",
      };

      return fields[props.labelPosition as keyof LabelPositionOptions];
    };

    const labelClasses = (): string => {
      const fields: LabelPositionOptions = {
        top: "mb-1",
        bottom: "mt-1",
        left: "mr-2",
        right: "ml-2",
      };
      const labelPosition =
        fields[props.labelPosition as keyof LabelPositionOptions];
      const size = props.size === "large" ? " text-sm" : " text-xs";
      return labelPosition + size;
    };

    return {
      toggle,
      wrapperClasses,
      labelClasses,
      buttonTranslateClass,
    };
  },
});
</script>
