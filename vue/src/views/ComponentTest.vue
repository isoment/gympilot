<template>
  <div class="container">
    <div class="flex justify-around">
      <CheckBox v-model="checkboxData" label="Test Check" />
      <CheckBox v-model="checkboxData" label="Test Check" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CheckBox from "@/components/inputs/CheckBox.vue";

export default defineComponent({
  name: "ComponentTest",

  components: { CheckBox },

  setup() {
    const checkboxData = ref(true);

    return { checkboxData };
  },
});
</script>
