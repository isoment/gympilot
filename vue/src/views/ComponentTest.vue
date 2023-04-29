<template>
  <div class="container">
    <div class="flex justify-around mt-3">
      <CheckBox
        v-model="checkboxData"
        label="Test Check"
        color="text-emerald-500"
        size="md"
        @click="handleClick"
      />
    </div>
    <div class="flex justify-around mt-10">
      <div>
        <SelectInput v-model="memberId" :items="names" label="Names" />
        <p class="text-sm">Selected User ID: {{ memberId }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CheckBox from "@/components/inputs/CheckBox.vue";
import SelectInput from "@/components/inputs/SelectInput.vue";

export default defineComponent({
  name: "ComponentTest",

  components: { CheckBox, SelectInput },

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

    return { checkboxData, handleChange, handleClick, names, memberId };
  },
});
</script>
