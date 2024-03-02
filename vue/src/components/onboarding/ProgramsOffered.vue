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
      <!-- Fitness -->
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
          <div>
            <CheckBox
              v-model="showFitnessTrainingOptions"
              color="text-indigo-500"
              label=""
            />
          </div>
        </div>
        <div
          v-if="showFitnessTrainingOptions"
          class="flex flex-col mt-2 mb-6 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <div
            v-for="program in onboardingProgramsOffered.fitness"
            :key="program.value"
            class="w-full sm:w-1/2"
          >
            <button
              class="w-full py-2 m-1 text-sm font-black border rounded-sm text-slate-800 border-slate-800 sm:w-11/12 hover:bg-emerald-50"
              :class="programSelectClass(program.value)"
              @click="selectProgram(program.value)"
            >
              {{ program.name }}
            </button>
          </div>
        </div>
        <div class="border-b border-slate-200"></div>
      </div>
      <!-- Yoga -->
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
          <div>
            <CheckBox
              v-model="showYogaOptions"
              label=""
              color="text-indigo-500"
            />
          </div>
        </div>
        <div
          v-if="showYogaOptions"
          class="flex flex-col mt-2 mb-6 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <div
            v-for="program in onboardingProgramsOffered.yoga"
            :key="program.value"
            class="w-full sm:w-1/2"
          >
            <button
              class="w-full py-2 m-1 text-sm font-black border rounded-sm text-slate-800 border-slate-800 sm:w-11/12 hover:bg-emerald-50"
              :class="programSelectClass(program.value)"
              @click="selectProgram(program.value)"
            >
              {{ program.name }}
            </button>
          </div>
        </div>
        <div class="border-b border-slate-200"></div>
      </div>
      <!-- Gymnastics -->
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
          <div>
            <CheckBox
              v-model="showGymnasticsOptions"
              label=""
              color="text-indigo-500"
            />
          </div>
        </div>
        <div
          v-if="showGymnasticsOptions"
          class="flex flex-col mt-2 mb-6 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <div
            v-for="program in onboardingProgramsOffered.gymnastics"
            :key="program.value"
            class="w-full sm:w-1/2"
          >
            <button
              class="w-full py-2 m-1 text-sm font-black border rounded-sm text-slate-800 border-slate-800 sm:w-11/12 hover:bg-emerald-50"
              :class="programSelectClass(program.value)"
              @click="selectProgram(program.value)"
            >
              {{ program.name }}
            </button>
          </div>
        </div>
        <div class="border-b border-slate-200"></div>
      </div>
      <!-- Martial Arts -->
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
          <div>
            <CheckBox
              v-model="showMartialArtsOptions"
              label=""
              color="text-indigo-500"
            />
          </div>
        </div>
        <div
          v-if="showMartialArtsOptions"
          class="flex flex-col mt-2 mb-6 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <div
            v-for="program in onboardingProgramsOffered.martialArts"
            :key="program.value"
            class="w-full sm:w-1/2"
          >
            <button
              class="w-full py-2 m-1 text-sm font-black border rounded-sm text-slate-800 border-slate-800 sm:w-11/12 hover:bg-emerald-50"
              :class="programSelectClass(program.value)"
              @click="selectProgram(program.value)"
            >
              {{ program.name }}
            </button>
          </div>
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
import { defineComponent, onMounted, PropType, ref } from "vue";
import { StepperStatusProp } from "../types";
import ButtonGroup from "./ButtonGroup.vue";
import CheckBox from "../inputs/CheckBox.vue";
import { ButtonGroupEventValue } from "../types";
import onboardingProgramsOffered from "@/config/onboardingProgramsOffered";

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

  setup(_, { emit }) {
    const showFitnessTrainingOptions = ref(false);
    const showYogaOptions = ref(false);
    const showGymnasticsOptions = ref(false);
    const showMartialArtsOptions = ref(false);

    const buttonClicked = (event: ButtonGroupEventValue) => {
      if (event === "next") {
        const programsToSet = selectedPrograms.value ?? [];
        localStorage.setItem(
          "onboarding.programs",
          JSON.stringify(programsToSet)
        );
      }
      emit("click:button", event);
    };

    const selectedPrograms = ref<string[]>([]);

    onMounted(() => {
      const programsFromStorage = localStorage.getItem("onboarding.programs");

      if (programsFromStorage !== null) {
        selectedPrograms.value = JSON.parse(programsFromStorage);
        setOptionsCheckboxes();
      }
    });

    /**
     *  When getting the programs from local storage we want to set the category
     *  checkboxes to true to display the options for programs that are selected.
     *  To avoid multiple loops we can use a hash. The key is the name of the program
     *  category from onboardingProgramsOffered and the value is checkbox state. This
     *  is more succinct than having multiple loops.
     */
    const setOptionsCheckboxes = (): void => {
      const programOptionsMapping = {
        fitness: showFitnessTrainingOptions,
        yoga: showYogaOptions,
        martialArts: showMartialArtsOptions,
        gymnastics: showGymnasticsOptions,
      };

      for (const [program, optionRef] of Object.entries(
        programOptionsMapping
      )) {
        for (const item of onboardingProgramsOffered[program]) {
          if (selectedPrograms.value.includes(item.value)) {
            optionRef.value = true;
            break;
          }
        }
      }
    };

    const selectProgram = (program: string): void => {
      for (let i = 0; i < selectedPrograms.value.length; i++) {
        if (selectedPrograms.value[i] === program) {
          selectedPrograms.value.splice(i, 1);
          return;
        }
      }
      selectedPrograms.value.push(program);
    };

    const programSelectClass = (program: string): string => {
      if (selectedPrograms.value.includes(program)) {
        return "bg-emerald-100";
      }
      return "bg-white";
    };

    return {
      buttonClicked,
      onboardingProgramsOffered,
      programSelectClass,
      selectProgram,
      selectedPrograms,
      showFitnessTrainingOptions,
      showGymnasticsOptions,
      showMartialArtsOptions,
      showYogaOptions,
    };
  },
});
</script>
