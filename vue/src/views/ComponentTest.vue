<template>
  <div class="flex items-center justify-center">
    <div class="w-96">
      <!-- Checkbox -->
      <div class="flex justify-center mt-3">
        <CheckBox
          v-model="checkboxData"
          label="Test Check"
          size="md"
          @click="handleClick"
        />
      </div>
      <!-- Select -->
      <div class="flex justify-around mt-10">
        <SelectInput
          v-model="memberId"
          :items="names"
          label="Names"
          :disabled="false"
        />
      </div>
      <!-- Multiselect -->
      <div class="flex justify-around mt-10">
        <MultiSelect
          v-model="selectedEmployees"
          label="Employees"
          :items="employees"
          :disabled="false"
        />
      </div>
      <!-- Text -->
      <div class="flex justify-around mt-10">
        <TextInput
          v-model="firstName"
          label="First Name"
          placeholder="Text here..."
          :icon="['fa', 'user']"
        />
      </div>
      <!-- Toggle -->
      <div class="flex justify-start mt-10">
        <ToggleInput v-model="toggle" size="base" />
      </div>
      <!-- Button Primary -->
      <div class="flex justify-center mt-10">
        <ButtonPrimary
          text="My Button"
          size="base"
          color="bg-indigo-500"
          hover="hover:bg-indigo-400"
          :loading="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CheckBox from "@/components/inputs/CheckBox.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import MultiSelect from "@/components/inputs/MultiSelect.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import ToggleInput from "@/components/inputs/ToggleInput.vue";
import ButtonPrimary from "@/components/buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "ComponentTest",

  components: {
    CheckBox,
    SelectInput,
    MultiSelect,
    TextInput,
    ToggleInput,
    ButtonPrimary,
  },

  setup() {
    /**
     *  CheckBox
     */
    const checkboxData = ref(true);

    const handleChange = (event: InputEvent) => {
      const target = event.target as HTMLInputElement;
      console.log(target.checked);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      console.log(target.checked);
    };

    /**
     *  SelectInput
     */
    const memberId = ref(6);
    const names = ref([
      { value: 1, text: "Leslie Alexander" },
      { value: 2, text: "John Smith" },
      { value: 3, text: "Tim Franklin" },
      { value: 4, text: "Amy Brown" },
      { value: 5, text: "Fran Nolan" },
      { value: 6, text: "Andy Black" },
      { value: 7, text: "Wanda Liu" },
    ]);

    /**
     *  MultiSelect
     */
    const selectedEmployees = ref([7, 2, 3]);
    const employees = ref([
      { value: 1, text: "Wade Cooper" },
      { value: 2, text: "Arlene Mccoy" },
      { value: 3, text: "Devon Webb" },
      { value: 4, text: "Tom Cook" },
      { value: 5, text: "Tanya Fox" },
      { value: 6, text: "Hellen Schmvaluet" },
      { value: 7, text: "Caroline Schultz" },
      { value: 8, text: "Mason Heaney" },
      { value: 9, text: "Claudie Smitham" },
      { value: 10, text: "Emil Schaefer" },
    ]);

    /**
     *  TextInput
     */
    const firstName = ref("Franklin");

    /**
     *  Toggle
     */
    const toggle = ref(false);

    return {
      checkboxData,
      handleChange,
      handleClick,
      names,
      memberId,
      employees,
      selectedEmployees,
      firstName,
      toggle,
    };
  },
});
</script>
