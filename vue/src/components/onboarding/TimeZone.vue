<template>
  <div class="text-left">
    <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
      <h5 class="font-bold tracking-widest text-slate-800">Timezone</h5>
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <TimeZonePicker v-model="form.timezone" />
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <div class="flex flex-col sm:flex-row">
        <div class="w-full sm:w-1/2 sm:mr-1 mb-7">
          <SelectInput
            v-model="form.date_format"
            :items="dateFormatItems"
            label="Date format."
            color="bg-indigo-400"
            data-test="date_format"
          />
        </div>
        <div class="w-full sm:w-1/2 sm:ml-1">
          <SelectInput
            v-model="form.time_format"
            :items="timeFormatItems"
            label="Time format."
            color="bg-indigo-400"
            data-test="time_format"
          />
        </div>
      </div>
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
import SelectInput from "../inputs/SelectInput.vue";

const dateFormatItems = [
  {
    value: "MM/DD/YYYY",
    text: "Month / Day / Year",
  },
  {
    value: "DD/MM/YYYY",
    text: "Day / Month / Year",
  },
];

const timeFormatItems = [
  {
    value: "AM/PM",
    text: "AM / PM",
  },
  {
    value: "24HR",
    text: "24 Hour",
  },
];

export default defineComponent({
  name: "TimeZone",

  components: { ButtonGroup, TimeZonePicker, SelectInput },

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
      date_format: "MM/DD/YYYY",
      time_format: "AM/PM",
    });

    const buttonClicked = (event: ButtonGroupEventValue) => {
      emit("click:button", event);
    };

    return { buttonClicked, dateFormatItems, timeFormatItems, form };
  },
});
</script>
