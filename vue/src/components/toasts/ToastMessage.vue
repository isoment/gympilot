<template>
  <div
    :class="toastColor"
    class="py-4 pl-5 pr-4 my-2 text-sm text-white rounded-md shadow-md"
    role="alert"
  >
    <div class="flex items-center justify-between">
      <span class="pr-3 text-lg">{{ toast.message }}</span>
      <span class="px-1">
        <font-awesome-icon
          :icon="toastIcon"
          class="text-xl fill-current white"
          data-test="icon"
        >
        </font-awesome-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, onMounted } from "vue";
import { Toast } from "../../store/types";
import { REMOVE_TOAST } from "@/store/constants";
import { key } from "../../store";
import { useStore } from "vuex";

export default defineComponent({
  name: "ToastMessage",

  props: {
    toast: {
      type: Object as PropType<Toast>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore(key);

    onMounted(() => {
      setTimeout(() => {
        store.dispatch(REMOVE_TOAST, props.toast);
      }, 3000);
    });

    const toastColor = computed(() => {
      if (props.toast.type === "error") {
        return "bg-red-400";
      }
      return "bg-emerald-400";
    });

    const toastIcon = computed(() => {
      if (props.toast.type === "error") {
        return ["fa", "circle-exclamation"];
      }
      return ["fa", "circle-check"];
    });

    return { toastColor, toastIcon };
  },
});
</script>
