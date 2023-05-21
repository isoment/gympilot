<template>
  <button
    type="button"
    class="inline-flex items-center justify-center w-full text-sm font-medium leading-4 text-white border border-transparent rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
    :class="buttonClasses()"
    :disabled="disabled"
  >
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      :class="iconClasses()"
      class="fill-current"
      data-test="icon"
    >
    </font-awesome-icon>
    <span :class="textClasses()">
      <slot>{{ text }}</slot>
    </span>
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
        if (props.size === "small") classes.push("text-xs");
        if (props.size === "base") classes.push("text-sm");
        if (props.size === "large") classes.push("text-sm");
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
      if (props.size === "small") {
        classes.push("px-2", "py-1");
      } else if (props.size === "large") {
        classes.push("px-3", "py-3");
      } else {
        classes.push("px-3", "py-2");
      }
      return classes.join(" ");
    };

    const textClasses = (): string => {
      const classes = [props.textColor];
      if (props.size === "small") classes.push("text-xs");
      if (props.size === "base") classes.push("text-sm");
      if (props.size === "large") classes.push("text-base");
      return classes.join(" ");
    };

    return {
      iconClasses,
      buttonClasses,
      textClasses,
    };
  },
});
</script>
