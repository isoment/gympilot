<template>
  <div>
    <div v-if="firstStep">
      <div class="w-full">
        <ButtonPrimary
          data-test="next-button"
          color="bg-emerald-400"
          hover="hover:bg-emerald-300"
          @click="nextClicked()"
          >Next</ButtonPrimary
        >
      </div>
    </div>
    <div class="flex flex-row justify-between" v-else-if="lastStep">
      <div class="w-1/2 mr-1 sm:w-1/4">
        <ButtonPrimary
          data-test="next-button"
          color="bg-indigo-500"
          hover="hover:bg-indigo-400"
          @click="previousClicked()"
          >Previous</ButtonPrimary
        >
      </div>
      <div class="w-1/2 ml-1 sm:w-1/4">
        <ButtonPrimary
          data-test="next-button"
          color="bg-emerald-400"
          hover="hover:bg-emerald-300"
          @click="finishClicked()"
          >Finish</ButtonPrimary
        >
      </div>
    </div>
    <div v-else class="flex flex-row justify-between">
      <div class="w-1/2 mr-1 sm:w-1/4">
        <ButtonPrimary
          data-test="next-button"
          color="bg-indigo-500"
          hover="hover:bg-indigo-400"
          @click="previousClicked()"
          >Previous</ButtonPrimary
        >
      </div>
      <div class="w-1/2 ml-1 sm:w-1/4">
        <ButtonPrimary
          data-test="next-button"
          color="bg-emerald-400"
          hover="hover:bg-emerald-300"
          @click="nextClicked()"
          >Next</ButtonPrimary
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { StepperStatusProp } from "../types";
import ButtonPrimary from "../buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "ButtonGroup",

  components: { ButtonPrimary },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:action"],

  setup(props, { emit }) {
    const firstStep = computed(() => {
      return props.status.first;
    });

    const lastStep = computed(() => {
      return props.status.last;
    });

    const finishClicked = () => {
      emit("click:action", "finish");
    };

    const nextClicked = () => {
      emit("click:action", "next");
    };

    const previousClicked = () => {
      emit("click:action", "previous");
    };

    return { finishClicked, firstStep, lastStep, nextClicked, previousClicked };
  },
});
</script>
