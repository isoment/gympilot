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
      <ValidationErrors
        :errors="validationErrors"
        field="currency"
        class="mt-2 ml-1 -mb-2 text-left"
      />
    </div>
    <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
      <div class="flex flex-col sm:flex-row">
        <div class="w-full sm:w-1/2 sm:mr-1 mb-7">
          <SelectInput
            v-model="form.billing_date"
            :items="billingDateOptions"
            label="Billing Date."
            color="bg-indigo-400"
            data-test="billing_date"
          />
          <ValidationErrors
            :errors="validationErrors"
            field="billing_date"
            class="mt-2 ml-1 -mb-2 text-left"
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
          <ValidationErrors
            :errors="validationErrors"
            field="allow_cancellation"
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
import { defineComponent, PropType, ref, onMounted } from "vue";
import { StepperStatusProp } from "../types";
import ButtonGroup from "./ButtonGroup.vue";
import { ButtonGroupEventValue } from "../types";
import SelectInput from "../inputs/SelectInput.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import {
  availableCurrencies,
  billingDateOptions,
  cancelOptions,
} from "@/config/options";
import { validBooleanInt } from "@/utils/validationHelpers";

interface FormValidationErrors {
  currency?: string;
  billing_date?: string;
  allow_cancellation?: string;
}

export default defineComponent({
  name: "YourBilling",

  components: { ButtonGroup, SelectInput, ValidationErrors },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:button"],

  setup(_, { emit }) {
    const form = ref({
      currency: "USD",
      billing_date: "start",
      allow_cancellation: 1,
    });
    const validationErrors = ref<FormValidationErrors>({});

    onMounted(() => {
      const billingFromStorage = localStorage.getItem("onboarding.billing");

      if (billingFromStorage !== null) {
        form.value = JSON.parse(billingFromStorage);
      }
    });

    const buttonClicked = (event: ButtonGroupEventValue) => {
      if (event === "finish") {
        validationErrors.value = {};
        const valid = formValid();
        if (valid) {
          localStorage.setItem(
            "onboarding.billing",
            JSON.stringify(form.value)
          );
        } else {
          return;
        }
      }
      emit("click:button", event);
    };

    const formValid = () => {
      const formData = form.value;

      if (!availableCurrencies.some((obj) => obj.value === formData.currency)) {
        validationErrors.value["currency"] = "Invalid currency selection";
        return false;
      }

      if (
        !billingDateOptions.some((obj) => obj.value === formData.billing_date)
      ) {
        validationErrors.value["billing_date"] = "Invalid billing date";
        return false;
      }

      if (!validBooleanInt(formData.allow_cancellation)) {
        validationErrors.value["allow_cancellation"] =
          "Invalid cancellation option";
        return false;
      }

      return true;
    };

    return {
      availableCurrencies,
      billingDateOptions,
      buttonClicked,
      cancelOptions,
      form,
      validationErrors,
    };
  },
});
</script>
