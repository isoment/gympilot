<template>
  <div>
    <Combobox v-model="selectedTimezone" as="div">
      <ComboboxLabel
        class="block ml-1 text-xs font-medium text-left text-gray-700"
        >Select Your Timezone</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 text-sm bg-white border rounded shadow-sm border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
          :display-value="(option: Option) => option.text"
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
          class="absolute z-40 w-full py-1 mt-1 overflow-auto text-xs bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="option in filteredTimezones"
            :key="option.value"
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
                {{ option.text }}
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

<script lang="ts">
import {
  computed,
  ref,
  onMounted,
  PropType,
  watch,
  defineComponent,
} from "vue";
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
import { availableCountries } from "gympilot-shared-resources";

interface Option {
  value: string;
  text: string;
}

export default defineComponent({
  name: "TimezonePicker",

  components: {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
  },

  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const query = ref("");
    const queryDebounce = refDebounced(query, 800);

    const selectedTimezone = ref();
    const options: Option[] = [];

    onMounted(() => {
      const timezones = getTimeZones();

      timezones.forEach((t) => {
        const hasCountry = availableCountries.some(
          (obj) => obj["name"] === t.countryName
        );
        if (hasCountry) {
          const offset = t.rawFormat.split(" ")[0];

          options.push({
            value: t.name,
            text: `(UTC${offset}) - ${t.alternativeName} - ${t.countryName} - ${t.mainCities[0]}`,
          });
        }
      });

      setSelectedItem();
    });

    watch(selectedTimezone, () => {
      emit("update:modelValue", selectedTimezone.value.value);
    });

    watch(
      () => props.modelValue,
      () => {
        setSelectedItem();
      }
    );

    const setSelectedItem = () => {
      for (const i of options) {
        if (i.value === props.modelValue) {
          selectedTimezone.value = i;
        }
      }
    };

    const filteredTimezones = computed(() =>
      queryDebounce.value === ""
        ? options
        : options.filter((option) => {
            return option.text
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
});
</script>
