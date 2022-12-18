<template>
  <div
    v-if="errors"
    class="text-red-400 text-xs italic my-1"
    v-text="errors[0]"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ValidationErrors",

  props: {
    errors: {
      type: Array as PropType<string[] | undefined>,
      required: true,
    },
  },
});
</script>
