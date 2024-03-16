<template>
  <div class="flex items-center">
    <input
      id="checkbox"
      v-model="isChecked"
      type="checkbox"
      class="border-gray-400 rounded focus:ring-slate-500"
      :disabled="disabled"
      :class="inputClasses()"
      aria-describedby="checkbox-label"
      data-test="checkbox"
      @change="onChange"
      @click="onClick"
    />
    <label
      id="checkbox-label"
      class="ml-2"
      :class="labelClasses()"
      data-test="label"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "CheckBox",

  props: {
    label: {
      type: String as PropType<string>,
      required: true,
    },
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    color: {
      type: String as PropType<string>,
      default: "text-emerald-400",
    },
    size: {
      type: String as PropType<string>,
      default: "md",
      validator: (value: string) => {
        const size = ["sm", "md", "lg"];
        return size.includes(value);
      },
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  emits: ["update:modelValue", "click"],

  setup(props, { emit }) {
    const isChecked = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        isChecked.value = newValue;
      }
    );

    const onChange = (): void => {
      emit("update:modelValue", isChecked.value);
    };

    const onClick = (event: MouseEvent): void => {
      emit("click", event);
    };

    const inputClasses = (): string => {
      let classes: string[] = [];

      // Set the classes based on disabled prop
      if (props.disabled) {
        classes.push("text-zinc-300");
      } else {
        classes.push("cursor-pointer", props.color);
      }

      // Set the size classes
      if (props.size === "sm") {
        classes.push("small-checkbox");
      } else if (props.size === "md") {
        classes.push("med-checkbox");
      } else if (props.size === "lg") {
        classes.push("large-checkbox");
      }

      return classes.join(" ");
    };

    const labelClasses = (): string => {
      if (props.size === "sm") {
        return "text-sm";
      } else if (props.size === "md") {
        return "text-base";
      } else {
        return "text-lg";
      }
    };

    return {
      onChange,
      onClick,
      isChecked,
      inputClasses,
      labelClasses,
    };
  },
});
</script>

<style scoped>
#checkbox-label {
  padding-top: 2px;
}

.small-checkbox {
  @apply h-4 w-4;
}

.med-checkbox {
  @apply h-5 w-5;
}

.large-checkbox {
  @apply h-6 w-6;
}
</style>
