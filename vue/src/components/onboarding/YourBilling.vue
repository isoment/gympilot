<template>
  <div class="text-left">
    <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
      <h5 class="font-bold tracking-widest text-slate-800">Payments</h5>
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <SelectInput
        v-model="form.currency"
        :items="availableCurrencies"
        label="Please select your currency"
        color="bg-indigo-400"
        data-test="currency"
      />
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <div class="flex flex-col sm:flex-row">
        <div class="w-full sm:w-1/2 sm:mr-1 mb-7">
          <SelectInput
            v-model="form.billingDate"
            :items="billingDateOptions"
            label="Billing Date."
            color="bg-indigo-400"
            data-test="billing_date"
          />
        </div>
        <div class="w-full sm:w-1/2 sm:ml-1">
          <SelectInput
            v-model="form.allow_cancellation"
            :items="cancelOptions"
            label="Allow self cancellation?"
            color="bg-indigo-400"
            data-test="cancellation"
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
import SelectInput from "../inputs/SelectInput.vue";
import { availableCurrencies } from "@/config/options";

const billingDateOptions = [
  {
    value: "start",
    text: "Membership start date",
  },
  {
    value: "first-of-month",
    text: "First of the month",
  },
  {
    value: "last-of-month",
    text: "Last of the month",
  },
];

const cancelOptions = [
  {
    value: 1,
    text: "Yes",
  },
  {
    value: 0,
    text: "No",
  },
];

export default defineComponent({
  name: "YourBilling",

  components: { ButtonGroup, SelectInput },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:button"],

  setup(props, { emit }) {
    console.log(props.status);

    const form = ref({
      currency: "USD",
      billingDate: "start",
      allow_cancellation: 1,
    });

    const buttonClicked = (event: ButtonGroupEventValue) => {
      emit("click:button", event);
    };

    return {
      availableCurrencies,
      billingDateOptions,
      buttonClicked,
      cancelOptions,
      form,
    };
  },
});
</script>
