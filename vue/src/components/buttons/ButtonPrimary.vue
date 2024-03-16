<template>
  <button
    type="button"
    class="inline-flex items-center justify-center w-full font-medium leading-4 text-white border border-transparent rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
    :class="buttonClasses()"
    :disabled="disabled"
    data-test="button"
  >
    <div v-if="loading" :class="spinnerWrapperClasses()">
      <font-awesome-icon
        :icon="['fa', 'spinner']"
        class="mr-1 animate-spin"
        :class="spinnerClasses()"
      ></font-awesome-icon>
    </div>
    <div v-else>
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        :class="iconClasses()"
        class="fill-current"
        data-test="icon"
      >
      </font-awesome-icon>
      <span :class="textClasses()" data-test="text">
        <slot>{{ text }}</slot>
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ButtonPrimary",

  props: {
    text: {
      type: String as PropType<string | number>,
      default: "Button",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    color: {
      type: String as PropType<string>,
      default: "bg-emerald-400",
    },
    hover: {
      type: String as PropType<string>,
      default: "hover:bg-emerald-500",
    },
    icon: {
      type: Array as PropType<string[]>,
      default: null,
    },
    textColor: {
      type: String as PropType<string>,
      default: "text-white",
    },
    iconPosition: {
      type: String as PropType<string>,
      default: "left",
    },
    size: {
      type: String as PropType<string>,
      default: "base",
    },
  },

  setup(props) {
    const iconClasses = (): string => {
      const classes = [props.textColor];
      if (props.icon) {
        if (props.iconPosition === "left") classes.push("mr-2");
        if (props.iconPosition === "right") classes.push("ml-2");
        if (props.size === "small") classes.push("icon-small");
        if (props.size === "base" || props.size === "large")
          classes.push("icon-base");
      }
      return classes.join(" ");
    };

    const buttonClasses = (): string => {
      const classes = [
        "transition-all",
        "duration-200",
        props.color,
        props.hover,
      ];
      if (props.iconPosition === "right") classes.push("flex-row-reverse");
      if (props.size === "small") classes.push("padding-small");
      if (props.size === "base") classes.push("padding-base");
      if (props.size === "large") classes.push("padding-large");
      return classes.join(" ");
    };

    const textClasses = (): string => {
      const classes = [props.textColor];
      if (props.size === "small") classes.push("text-small");
      if (props.size === "base") classes.push("text-normal");
      if (props.size === "large") classes.push("text-large");
      return classes.join(" ");
    };

    const spinnerClasses = (): string => {
      if (props.size === "small") return "text-base";
      if (props.size === "large") return "text-2xl";
      return "text-2xl";
    };

    const spinnerWrapperClasses = (): string => {
      if (props.size === "large") return "py-0.5";
      return "";
    };

    return {
      iconClasses,
      buttonClasses,
      textClasses,
      spinnerClasses,
      spinnerWrapperClasses,
    };
  },
});
</script>

<style scoped>
.text-small {
  @apply text-xs;
}

.text-normal {
  @apply text-base;
}

.text-large {
  @apply text-lg;
}

.padding-small {
  @apply px-2 py-1;
}

.padding-base {
  @apply px-3 py-2;
}

.padding-large {
  @apply px-3 py-2.5;
}

.icon-small {
  @apply text-xs;
}

.icon-base {
  @apply text-sm;
}
</style>
