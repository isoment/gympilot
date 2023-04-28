<template>
  <div class="flex items-center">
    <input
      id="checkbox"
      v-model="isChecked"
      type="checkbox"
      class="border-gray-400 rounded focus:ring-slate-700"
      :class="color"
      aria-describedby="checkbox-label"
      @change="onChange"
      @click="onClick"
    />
    <label id="checkbox-label" class="ml-2">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

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
    color: {
      type: String,
      default: "text-emerald-500",
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => {
        const size = ["sm", "md", "lg"];
        return size.includes(value);
      },
    },
  },

  emits: ["update:modelValue", "click"],

  setup(props, { emit }) {
    const isChecked = ref(props.modelValue);

    onMounted((): void => {
      setSize();
    });

    const onChange = (): void => {
      emit("update:modelValue", isChecked.value);
    };

    const onClick = (event: MouseEvent): void => {
      emit("click", event);
    };

    const setSize = (): void => {
      const checkbox = document.getElementById("checkbox");
      const label = document.getElementById("checkbox-label");
      if (props.size === "sm") {
        checkbox?.classList.add("small-checkbox");
        label?.classList.add("text-sm");
      }
      if (props.size === "md") {
        checkbox?.classList.add("med-checkbox");
        label?.classList.add("text-base");
      }
      if (props.size === "lg") {
        checkbox?.classList.add("large-checkbox");
        label?.classList.add("text-lg");
      }
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
