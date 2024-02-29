<template>
  <div>
    <div class="flex justify-center w-full">
      <div
        class="w-full max-w-6xl mx-2 mt-4 rounded-lg shadow-sm md:mt-12 md:border md:w-8/10 lg:pt-2 border-slate-200"
      >
        <div class="mt-4 ml-4 mr-8 text-left md:ml-8">
          <h3
            class="font-sans text-4xl font-black tracking-wide text-slate-800"
          >
            Welcome to GymPilot
          </h3>
          <h5 class="mt-2 text-slate-500">
            Let's take a few minutes to setup your account. You can change this
            information at any time in the dashboard.
          </h5>
        </div>

        <nav class="px-2 py-4 md:px-4 md:m-2" aria-label="Progress">
          <ol role="list">
            <li
              v-for="(step, stepIdx) in steps"
              :key="step.name"
              :class="[stepIdx !== steps.length - 1 ? 'pb-6' : '', 'relative']"
            >
              <!-- Step Complete -->
              <template v-if="step.status === 'complete'">
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                  aria-hidden="true"
                />
                <div class="relative flex items-start group">
                  <span class="flex items-center h-9">
                    <span
                      class="relative z-10 flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full group-hover:bg-indigo-800"
                    >
                      <font-awesome-icon
                        :icon="['fa', 'check']"
                        class="text-sm text-white"
                      >
                      </font-awesome-icon>
                    </span>
                  </span>
                  <span class="flex flex-col items-start min-w-0 ml-4">
                    <span
                      class="text-xs font-semibold tracking-wide uppercase"
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </div>
              </template>
              <!-- Step Current -->
              <template v-else-if="step.status === 'current'">
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                  aria-hidden="true"
                />
                <div
                  href="#"
                  class="relative flex items-start group"
                  aria-current="step"
                >
                  <span class="flex items-center h-9" aria-hidden="true">
                    <span
                      class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-indigo-600 rounded-full"
                    >
                      <span class="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                    </span>
                  </span>
                  <span class="flex flex-col items-start min-w-0 ml-4">
                    <span
                      class="text-xs font-semibold tracking-wide text-indigo-600 uppercase"
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </div>
                <!-- Render Vue Component Here -->
                <div class="mt-4 ml-12 mr-2">
                  <component
                    :is="getComponentName()"
                    :status="stepperStatus()"
                    @click:button="componentButtonClicked($event)"
                  ></component>
                </div>
              </template>
              <!-- Step Upcoming -->
              <template v-else>
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                  aria-hidden="true"
                />
                <div class="relative flex items-start group">
                  <span class="flex items-center h-9" aria-hidden="true">
                    <span
                      class="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400"
                    >
                      <span
                        class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                      />
                    </span>
                  </span>
                  <span class="flex flex-col items-start min-w-0 ml-4">
                    <span
                      class="text-xs font-semibold tracking-wide text-gray-500 uppercase"
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </div>
              </template>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { StepperStatusProp } from "@/components/types";
import TimeZone from "@/components/onboarding/TimeZone.vue";
import YourBilling from "@/components/onboarding/YourBilling.vue";
import YourOrganization from "@/components/onboarding/YourOrganization.vue";
import ProgramsOffered from "@/components/onboarding/ProgramsOffered.vue";
import { ButtonGroupEventValue } from "@/components/types";
import { ADD_TOAST } from "@/store/constants";

export default defineComponent({
  name: "OnboardingLayout",

  components: { TimeZone, YourBilling, YourOrganization, ProgramsOffered },

  setup() {
    const store = useStore(key);

    /**
     *  Status can be current, complete or upcoming
     */
    const steps = ref([
      {
        name: "Organization",
        description: "About your business",
        status: "current",
        component: "YourOrganization",
      },
      {
        name: "Programs",
        description: "What your organization offers",
        status: "upcoming",
        component: "ProgramsOffered",
      },
      {
        name: "Time Zone",
        description: "Select your location",
        status: "upcoming",
        component: "TimeZone",
      },
      {
        name: "Billing",
        description: "Your billing details",
        status: "upcoming",
        component: "YourBilling",
      },
    ]);

    const getComponentName = () => {
      const stepObject = steps.value.find((s) => s.status === "current");
      return stepObject!.component;
    };

    const selectStep = (index: number) => {
      // Set previous steps to complete
      for (let i = 0; i < index; i++) {
        steps.value[i].status = "complete";
      }

      // Set the selected step to current
      steps.value[index].status = "current";

      // Set the next steps to upcoming
      for (let i = index + 1; i < steps.value.length; i++) {
        steps.value[i].status = "upcoming";
      }
    };

    const stepperStatus = (): StepperStatusProp | undefined => {
      for (const [index, value] of steps.value.entries()) {
        if (value.status === "current") {
          return {
            index: index,
            first: index === 0 ? true : false,
            last: index === steps.value.length - 1 ? true : false,
          };
        }
      }
    };

    const componentButtonClicked = (event: ButtonGroupEventValue) => {
      const status = stepperStatus();

      if (!status) return;

      if (event === "next") {
        selectStep(status.index + 1);
      } else if (event === "previous") {
        selectStep(status.index - 1);
      } else if (event === "finish") {
        submitOnboarding();
      }
    };

    const submitOnboarding = async () => {
      console.log("submitOnboarding");

      // Check that the values from each stage are in local storage. Programs are optional so
      // we don't need to check against that.
      const organization = localStorage.getItem("onboarding.organization");
      const programs = localStorage.getItem("onboarding.programs");
      const timezone = localStorage.getItem("onboarding.timezone");
      const billing = localStorage.getItem("onboarding.billing");

      if (!organization || !timezone || !billing) {
        store.dispatch(ADD_TOAST, {
          type: "error",
          message: "Please check the form for errors",
        });
        selectStep(0);
        return;
      }

      // Make API call
      console.log("API CALL");
    };

    return {
      steps,
      getComponentName,
      selectStep,
      stepperStatus,
      componentButtonClicked,
    };
  },
});
</script>
