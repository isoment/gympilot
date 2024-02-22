<template>
  <div>
    <Combobox v-model="selectedTimezone" as="div">
      <ComboboxLabel
        class="block ml-1 text-xs font-medium text-left text-gray-700"
        >Select Your Timezone</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 bg-white border rounded shadow-sm border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          :display-value="(option) => option.name"
          placeholder="Search by country or city"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r focus:outline-none"
        >
          <font-awesome-icon
            :icon="['fa', 'chevron-down']"
            class="z-10 text-xs"
          >
          </font-awesome-icon>
        </ComboboxButton>
        <ComboboxOptions
          v-if="filteredTimezones.length > 0"
          class="relative z-40 w-full py-1 mt-1 overflow-auto text-xs bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="option in filteredTimezones"
            :key="option.id"
            v-slot="{ active, selected }"
            :value="option"
            as="template"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-indigo-400 text-white' : 'text-slate-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ option.name }}
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
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { refDebounced } from "@vueuse/core";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { getTimeZones } from "@vvo/tzdb";
import { availableCountries } from "@/config/options";

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
    const queryDebounce = refDebounced(query, 800);

    const selectedTimezone = ref();
    const options = [];

    onMounted(() => {
      const timezones = getTimeZones();
      console.log(timezones);

      timezones.forEach((t) => {
        if (availableCountries.includes(t.countryName)) {
          const offset = t.rawFormat.split(" ")[0];

          options.push({
            id: t.name,
            name: `(UTC${offset}) - ${t.alternativeName} - ${t.countryName} - ${t.mainCities[0]}`,
          });
        }
      });

      console.log(options);
    });

    const filteredTimezones = computed(() =>
      queryDebounce.value === ""
        ? options
        : options.filter((option) => {
            return option.name
              .toLowerCase()
              .includes(queryDebounce.value.toLowerCase());
          })
    );

    return {
      query,
      selectedTimezone,
      filteredTimezones,
    };
  },
};
</script>
