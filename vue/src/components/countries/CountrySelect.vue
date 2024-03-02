<template>
  <div>
    <Combobox v-model="selectedCountry" as="div">
      <ComboboxLabel
        class="block ml-1 text-xs font-medium text-left text-gray-700"
        >Select the country your organization is based out of</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 text-sm bg-white border rounded shadow-sm border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
          :display-value="(option: Option) => option.text"
          placeholder="Search"
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
          v-if="filteredCountries.length > 0"
          class="absolute z-40 w-full py-1 mt-1 overflow-auto text-xs bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="option in filteredCountries"
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
                <span
                  class="mr-2 fi"
                  :class="prepareFlagClass(option.value)"
                ></span
                ><span>{{ option.text }}</span>
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
import { computed, ref, onMounted, PropType, watch } from "vue";
import { refDebounced } from "@vueuse/core";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { availableCountries } from "gympilot-shared-resources";
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface Option {
  value: string;
  text: string;
}

export default {
  name: "CountrySelect",

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

    const selectedCountry = ref();
    const options: Option[] = [];

    onMounted(() => {
      availableCountries.forEach((country) => {
        options.push({
          value: country.code,
          text: country.name,
        });
      });

      setSelectedItem();
    });

    watch(selectedCountry, () => {
      emit("update:modelValue", selectedCountry.value.value);
    });

    watch(
      () => props.modelValue,
      () => {
        setSelectedItem();
      }
    );

    const filteredCountries = computed(() =>
      queryDebounce.value === ""
        ? options
        : options.filter((option) => {
            return option.text
              .toLowerCase()
              .includes(queryDebounce.value.toLowerCase());
          })
    );

    const setSelectedItem = () => {
      for (const i of options) {
        if (i.value === props.modelValue) {
          selectedCountry.value = i;
        }
      }
    };

    const prepareFlagClass = (code: string) => {
      return `fi-${code.toLowerCase()}`;
    };

    return {
      query,
      selectedCountry,
      filteredCountries,
      prepareFlagClass,
    };
  },
};
</script>
