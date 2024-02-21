<template>
  <div class="text-left">
    <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
      <h5 class="font-bold tracking-widest text-slate-800">Timezone</h5>
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <!-- Timezone Input Here -->
      <TimeZonePicker />
    </div>
    <div>
      <div class="w-full mt-8 mb-6 md:w-2/3 lg:w-1/2">
        <ButtonGroup :status="status" @click:action="buttonClicked($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { StepperStatusProp } from "../types";
import ButtonGroup from "./ButtonGroup.vue";
import { ButtonGroupEventValue } from "../types";
import TimeZonePicker from "@/components/timezone/TimezonePicker.vue";

export default defineComponent({
  name: "TimeZone",

  components: { ButtonGroup, TimeZonePicker },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:button"],

  setup(props, { emit }) {
    const form = ref({
      timezone: "",
    });

    const buttonClicked = (event: ButtonGroupEventValue) => {
      emit("click:button", event);
    };

    return { buttonClicked, form };
  },
});
</script>
