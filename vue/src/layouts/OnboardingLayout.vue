<template>
  <div>
    <div class="flex justify-center w-full">
      <div
        class="w-full max-w-6xl mx-2 mt-20 border rounded-lg shadow-sm md:w-8/10 lg:pt-2 border-slate-200"
      >
        <div class="mt-4 ml-8 text-left">
          <h3
            class="font-sans text-4xl font-black tracking-wide text-slate-800"
          >
            Welcome to GymPilot
          </h3>
          <h5 class="mt-2 text-slate-500">
            Let's take a few minutes to setup your account
          </h5>
        </div>

        <nav class="p-6 m-2" aria-label="Progress">
          <ol role="list" class="overflow-hidden">
            <li
              v-for="(step, stepIdx) in steps"
              :key="step.name"
              :class="[stepIdx !== steps.length - 1 ? 'pb-8' : '', 'relative']"
            >
              <template v-if="step.status === 'complete'">
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                  aria-hidden="true"
                />
                <a :href="step.href" class="relative flex items-start group">
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
                </a>
              </template>
              <template v-else-if="step.status === 'current'">
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                  aria-hidden="true"
                />
                <a
                  :href="step.href"
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
                </a>
                <!-- Render Vue Component Here -->
                <div class="mt-4 ml-5 mr-2 bg-emerald-50">
                  <component :is="getComponentName()"></component>
                </div>
              </template>
              <template v-else>
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                  aria-hidden="true"
                />
                <a :href="step.href" class="relative flex items-start group">
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
                </a>
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
import TimeZone from "@/components/onboarding/TimeZone.vue";
import YourBilling from "@/components/onboarding/YourBilling.vue";
import YourOrganization from "@/components/onboarding/YourOrganization.vue";

/**
 *  Status can be current, complete or upcoming
 */
const steps = [
  {
    name: "Organization",
    description: "About your business",
    href: "#",
    status: "current",
    component: "YourOrganization",
  },
  {
    name: "Time Zone",
    description: "Select your location",
    href: "#",
    status: "upcoming",
    component: "TimeZone",
  },
  {
    name: "Billing",
    description: "Your billing details",
    href: "#",
    status: "upcoming",
    component: "Billing",
  },
];

export default defineComponent({
  name: "OnboardingLayout",

  components: { TimeZone, YourBilling, YourOrganization },

  setup() {
    const currentStep = ref(0);

    const getComponentName = () => {
      const stepObject = steps.find((s) => s.status === "current");
      return stepObject!.component;
    };

    return { steps, currentStep, getComponentName };
  },
});
</script>
