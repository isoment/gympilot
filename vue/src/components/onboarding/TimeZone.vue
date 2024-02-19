<template>
  <div class="text-left">
    <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
      <h5 class="font-bold tracking-widest text-slate-800">Timezone</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StepperStatusProp } from "../types";
import { timeZonesNames } from "@vvo/tzdb";

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
    console.log(timeZonesNames);

    return {};
  },
});
</script>
