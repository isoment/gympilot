<template>
  <div class="container">
    <div class="flex justify-around">
      <CheckBox
        v-model="checkboxData"
        label="Test Check"
        color="text-emerald-500"
        size="md"
        @click="handleClick"
      />
    </div>
    <div class="flex justify-around mt-10">
      <SelectInput />
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

    return { checkboxData, handleChange, handleClick };
  },
});
</script>
