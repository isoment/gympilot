<template>
  <div class="text-left">
    <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
      <h5 class="font-bold tracking-widest text-slate-800">Payments</h5>
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <SelectInput
        v-model="form.currency"
        :items="availableCurrencies"
        class="relative z-10"
        label="Please select your currency"
        color="bg-indigo-400"
        data-test="currency"
      />
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
      currency: "",
    });

    const buttonClicked = (event: ButtonGroupEventValue) => {
      emit("click:button", event);
    };

    return { availableCurrencies, buttonClicked, form };
  },
});
</script>
