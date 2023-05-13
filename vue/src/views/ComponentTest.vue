<template>
  <div>
    <!-- Checkbox -->
    <div class="flex justify-around mt-3">
      <CheckBox
        v-model="checkboxData"
        label="Test Check"
        color="text-emerald-500"
        size="md"
        @click="handleClick"
      />
    </div>
    <!-- Select -->
    <div class="flex justify-around mt-10">
      <div>
        <SelectInput v-model="memberId" :items="names" label="Names" />
        <p class="text-sm">Selected User ID: {{ memberId }}</p>
      </div>
    </div>
    <!-- Multiselect -->
    <div class="flex justify-around mt-10">
      <div class="w-80">
        <MultiSelect
          v-model="selectedEmployees"
          label="Employees"
          :items="employees"
          :disabled="false"
        />
      </div>
    </div>
    <!-- Text -->
    <div class="flex justify-around mt-10">
      <TextInput v-model="firstName" label="First Name" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CheckBox from "@/components/inputs/CheckBox.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";
import MultiSelect from "@/components/inputs/MultiSelect.vue";
import TextInput from "@/components/inputs/TextInput.vue";

export default defineComponent({
  name: "ComponentTest",

  components: { CheckBox, SelectInput, MultiSelect, TextInput },

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
    const selectedEmployees = ref([7, 2, 1]);
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
    const firstName = ref("William Foster");

    return {
      checkboxData,
      handleChange,
      handleClick,
      names,
      memberId,
      employees,
      selectedEmployees,
      firstName,
    };
  },
});
</script>
