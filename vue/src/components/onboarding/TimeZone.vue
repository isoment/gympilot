<template>
  <div>
    <h5 class="font-bold tracking-widest text-slate-800">Timezone</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StepperStatusProp } from "../types";

export default defineComponent({
  name: "TimeZone",

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  setup(props) {
    console.log(props.status);

    return {};
  },
});
</script>
