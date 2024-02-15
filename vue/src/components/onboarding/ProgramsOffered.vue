<template>
  <div class="text-left">
    <div>
      <h5 class="mt-6 mb-4 ml-1 font-bold tracking-widest text-slate-700">
        What programs do you offer?
      </h5>
    </div>
    <div>
      <div class="w-full mb-6 md:w-2/3 lg:w-1/2">
        <ButtonGroup :status="status" @click:action="buttonClicked($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { StepperStatusProp } from "../types";
import ButtonGroup from "./ButtonGroup.vue";
import { ButtonGroupEventValue } from "../types";

export default defineComponent({
  name: "ProgramsOffered",

  components: { ButtonGroup },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:button"],

  setup(props, { emit }) {
    console.log(props.status);

    const buttonClicked = (event: ButtonGroupEventValue) => {
      emit("click:button", event);
    };

    return { buttonClicked };
  },
});
</script>
