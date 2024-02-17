<template>
  <div class="text-left">
    <div>
      <div class="w-full mt-8 mb-6 ml-1 md:w-2/3 lg:w-1/2">
        <h5 class="mt-6 mb-1 font-bold tracking-widest text-slate-700">
          What programs do you offer?
        </h5>
        <p class="mt-0 mb-4 text-xs">
          You can select from some programs below for some pre-configured
          options from some program templates.
        </p>
      </div>
      <div class="w-full mt-6 mb-6 ml-1 md:w-2/3 lg:w-1/2">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <img
              src="../../assets/gym.jpg"
              alt="gym"
              class="w-12 h-12 rounded-full"
            />
            <h6 class="ml-3 text-base font-extrabold text-slate-800">
              Fitness
            </h6>
          </div>
          <div><CheckBox v-model="showFitnessTrainingOptions" label="" /></div>
        </div>
        <div v-if="showFitnessTrainingOptions" class="mt-2 mb-6">
          Fitness Options
        </div>
        <div class="border-b border-slate-200"></div>
      </div>
      <div class="w-full mt-6 mb-6 ml-1 md:w-2/3 lg:w-1/2">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <img
              src="../../assets/yoga.jpg"
              alt="gym"
              class="w-12 h-12 rounded-full"
            />
            <h6 class="ml-3 text-base font-extrabold text-slate-800">Yoga</h6>
          </div>

          <div><CheckBox v-model="showYogaOptions" label="" /></div>
        </div>
        <div v-if="showYogaOptions" class="mt-2 mb-6">Yoga Options</div>
        <div class="border-b border-slate-200"></div>
      </div>
      <div class="w-full mt-6 mb-6 ml-1 md:w-2/3 lg:w-1/2">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <img
              src="../../assets/gymnastics.jpg"
              alt="gym"
              class="w-12 h-12 rounded-full"
            />
            <h6 class="ml-3 text-base font-extrabold text-slate-800">
              Gymnastics
            </h6>
          </div>

          <div><CheckBox v-model="showGymnasticsOptions" label="" /></div>
        </div>
        <div v-if="showGymnasticsOptions" class="mt-2 mb-6">
          Gymnastics Options
        </div>
        <div class="border-b border-slate-200"></div>
      </div>
      <div class="w-full mt-6 mb-6 ml-1 md:w-2/3 lg:w-1/2">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <img
              src="../../assets/martial-arts.jpg"
              alt="gym"
              class="w-12 h-12 rounded-full"
            />
            <h6 class="ml-3 text-base font-extrabold text-slate-800">
              Martial Arts
            </h6>
          </div>

          <div><CheckBox v-model="showMartialArtsOptions" label="" /></div>
        </div>
        <div v-if="showMartialArtsOptions" class="mt-2 mb-6">
          Martial Arts Options
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
import { defineComponent, PropType, ref } from "vue";
import { StepperStatusProp } from "../types";
import ButtonGroup from "./ButtonGroup.vue";
import CheckBox from "../inputs/CheckBox.vue";
import { ButtonGroupEventValue } from "../types";

export default defineComponent({
  name: "ProgramsOffered",

  components: { ButtonGroup, CheckBox },

  props: {
    status: {
      type: Object as PropType<StepperStatusProp>,
      required: true,
    },
  },

  emits: ["click:button"],

  setup(props, { emit }) {
    console.log(props.status);

    const showFitnessTrainingOptions = ref(false);
    const showYogaOptions = ref(false);
    const showGymnasticsOptions = ref(false);
    const showMartialArtsOptions = ref(false);

    const buttonClicked = (event: ButtonGroupEventValue) => {
      emit("click:button", event);
    };

    return {
      buttonClicked,
      showFitnessTrainingOptions,
      showGymnasticsOptions,
      showMartialArtsOptions,
      showYogaOptions,
    };
  },
});
</script>
