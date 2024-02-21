<template>
  <Combobox v-model="selectedPerson" as="div">
    <ComboboxLabel class="block text-sm font-medium text-slate-700"
      >Assigned to</ComboboxLabel
    >
    <div class="relative mt-1">
      <ComboboxInput
        class="w-full py-2 pl-3 pr-10 bg-white border rounded-md shadow-sm border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
        :display-value="(person) => person.name"
        @change="query = $event.target.value"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none"
      >
        X
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredPeople.length > 0"
        class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="person in filteredPeople"
          :key="person.id"
          v-slot="{ active, selected }"
          :value="person"
          as="template"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-400 text-white' : 'text-slate-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ person.name }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <font-awesome-icon
                :icon="['fa', 'check']"
                :class="[
                  'z-10 text-xs',
                  active ? 'text-white' : 'text-indigo-600',
                ]"
              >
              </font-awesome-icon>
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { getTimeZones } from "@vvo/tzdb";

const people = [
  { id: 1, name: "Leslie Alexander" },
  { id: 2, name: "Stan Black" },
  { id: 3, name: "H.P. Lovecraft" },
];

export default {
  components: {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
  },
  setup() {
    const query = ref("");
    const selectedPerson = ref();

    onMounted(() => {
      const timezones = getTimeZones();
      console.log(timezones);
    });

    const filteredPeople = computed(() =>
      query.value === ""
        ? people
        : people.filter((person) => {
            return person.name
              .toLowerCase()
              .includes(query.value.toLowerCase());
          })
    );

    return {
      query,
      selectedPerson,
      filteredPeople,
    };
  },
};
</script>
