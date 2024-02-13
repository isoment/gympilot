<template>
  <div class="text-left">
    <div>
      <h5 class="mt-6 mb-4 ml-1 font-bold tracking-widest text-slate-700">
        Tell us about your organization
      </h5>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <TextInput
          v-model="form.organization_name"
          label="Organization name, this can be the name of your company or brand."
          placeholder="Name"
          data-test="organization_name"
        />
        <ValidationErrors
          :errors="validationErrors"
          field="organization_name"
          class="mt-2 -mb-2 text-left"
        />
      </div>
    </div>
    <div>
      <h5 class="mt-8 mb-4 ml-1 font-bold tracking-widest text-slate-700">
        Create a location
      </h5>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <TextInput
          v-model="form.location_name"
          label="A location represents your gym, fitness studio etc. An upgraded account allow multiple locations."
          placeholder="Name"
          data-test="location_name"
        />
        <ValidationErrors
          :errors="validationErrors"
          field="location_name"
          class="mt-2 -mb-2 text-left"
        />
      </div>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <TextInput
          v-model="form.street_address"
          label="The street address of this location."
          placeholder="Address"
          data-test="street_address"
        />
        <ValidationErrors
          :errors="validationErrors"
          field="street_address"
          class="mt-2 -mb-2 text-left"
        />
      </div>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/2 sm:mr-1 mb-7">
            <TextInput
              v-model="form.city"
              label="The city or locality."
              placeholder="City / Locality"
              data-test="city"
            />
            <ValidationErrors
              :errors="validationErrors"
              field="city"
              class="mt-2 -mb-2 text-left"
            />
          </div>
          <div class="w-full sm:w-1/2 sm:ml-1">
            <TextInput
              v-model="form.postal_code"
              label="The postal code for this location"
              placeholder="Postal Code"
              data-test="postal_code"
            />
            <ValidationErrors
              :errors="validationErrors"
              field="postal_code"
              class="mt-2 -mb-2 text-left"
            />
          </div>
        </div>
      </div>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <ButtonGroup :status="status" @click:action="buttonClicked($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import TextInput from "../inputs/TextInput.vue";
import ButtonGroup from "./ButtonGroup.vue";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";
import { StepperStatusProp } from "../types";

interface FormValidationErrors {
  organization_name?: string;
  location_name?: string;
  street_address?: string;
  city?: string;
  postal_code?: string;
}

export default defineComponent({
  name: "YourOrganization",

  components: { ButtonGroup, TextInput, ValidationErrors },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  setup() {
    const form = ref({
      organization_name: "",
      location_name: "",
      street_address: "",
      city: "",
      postal_code: "",
    });
    const validationErrors = ref<FormValidationErrors>({});

    const buttonClicked = (event: any) => {
      console.log("BUTTON_CLICKED", event);
    };

    return { buttonClicked, form, validationErrors };
  },
});
</script>
