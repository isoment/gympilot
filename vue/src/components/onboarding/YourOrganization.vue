<template>
  <div class="text-left">
    <div>
      <h5 class="mt-6 mb-4 font-bold tracking-widest text-slate-700">
        Tell us about your organization
      </h5>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <TextInput
          v-model="form.organization_name"
          label="Organization name, this can be the name of your company or brand."
          data-test="organization_name"
        />
        <!-- <ValidationErrors
        :errors="loginValidationErrors"
        field="email"
        class="mt-2 -mb-2 text-left"
      /> -->
      </div>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TextInput from "../inputs/TextInput.vue";

export default defineComponent({
  name: "YourOrganization",

  components: { TextInput },

  setup() {
    const form = ref({
      organization_name: "",
    });

    return { form };
  },
});
</script>
