<template>
  <div class="text-left">
    <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
      <h5 class="font-bold tracking-widest text-slate-800">Timezone</h5>
      <p class="mt-0 mb-4 text-xs">
        Please select your timezone and preferred date time formats.
      </p>
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <TimeZonePicker v-model="form.timezone" />
      <ValidationErrors
        :errors="validationErrors"
        field="timezone"
        class="mt-2 ml-1 -mb-2 text-left"
      />
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
          <ValidationErrors
            :errors="validationErrors"
            field="date_format"
            class="mt-2 ml-1 -mb-2 text-left"
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
          <ValidationErrors
            :errors="validationErrors"
            field="time_format"
            class="mt-2 ml-1 -mb-2 text-left"
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
import { defineComponent, onMounted, PropType, ref } from "vue";
import { StepperStatusProp } from "../types";
import ButtonGroup from "./ButtonGroup.vue";
import { ButtonGroupEventValue } from "../types";
import TimeZonePicker from "@/components/timezone/TimezonePicker.vue";
import SelectInput from "../inputs/SelectInput.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import {
  dateFormatItems,
  timeFormatItems,
  validTimezone,
} from "gympilot-shared-resources";

interface FormValidationErrors {
  timezone?: string;
  date_format?: string;
  time_format?: string;
}

export default defineComponent({
  name: "TimeZone",

  components: { ButtonGroup, TimeZonePicker, SelectInput, ValidationErrors },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:button"],

  setup(_, { emit }) {
    const form = ref({
      timezone: "",
      date_format: "MM/DD/YYYY",
      time_format: "AM/PM",
    });
    const validationErrors = ref<FormValidationErrors>({});

    onMounted(() => {
      const timezoneFromStorage = localStorage.getItem("onboarding.timezone");

      if (timezoneFromStorage !== null) {
        form.value = JSON.parse(timezoneFromStorage);
      }
    });

    const buttonClicked = (event: ButtonGroupEventValue) => {
      if (event === "next") {
        validationErrors.value = {};
        const valid = formValid();
        if (valid) {
          localStorage.setItem(
            "onboarding.timezone",
            JSON.stringify(form.value)
          );
        } else {
          return;
        }
      }
      emit("click:button", event);
    };

    const formValid = (): boolean => {
      const formData = form.value;

      if (!validTimezone(formData.timezone)) {
        validationErrors.value["timezone"] = "Invalid timezone";
        return false;
      }

      if (!dateFormatItems.some((obj) => obj.value === formData.date_format)) {
        validationErrors.value["date_format"] = "Invalid date format";
        return false;
      }

      if (!timeFormatItems.some((obj) => obj.value === formData.time_format)) {
        validationErrors.value["time_format"] = "Invalid time format";
        return false;
      }

      return true;
    };

    return {
      buttonClicked,
      dateFormatItems,
      timeFormatItems,
      form,
      validationErrors,
    };
  },
});
</script>
