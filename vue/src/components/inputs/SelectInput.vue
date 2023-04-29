<template>
  <div>
    <Combobox v-model="selectedItem" as="div">
      <ComboboxLabel
        class="block ml-1 text-sm font-medium text-left text-gray-700"
        >Assigned to</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-700 sm:text-sm"
          :display-value="displayValue"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none"
        >
          <font-awesome-icon
            :icon="['fa', 'chevron-down']"
            class="z-10 text-xs fill-current input-icons text-emerald-400"
          >
          </font-awesome-icon>
        </ComboboxButton>
        <ComboboxOptions
          v-if="filteredItems.length > 0"
          class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="item in filteredItems"
            v-slot="{ active, selected }"
            :key="item.id"
            :value="item"
            as="template"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? 'bg-emerald-600 text-white' : 'text-gray-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ item.name }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                  active ? 'text-white' : 'text-emerald-600',
                ]"
              >
                <font-awesome-icon
                  :icon="['fa', 'check']"
                  class="z-10 text-xs fill-current input-icons text-emerald-400"
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
import { defineComponent, computed, ref } from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

const items = [
  { id: 1, name: "Leslie Alexander" },
  { id: 2, name: "John Smith" },
  { id: 3, name: "Tim Franklin" },
  { id: 4, name: "Amy Brown" },
];

interface Item {
  id: number;
  name: string;
}

export default defineComponent({
  name: "SelectInput",

  components: {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
  },

  props: {},

  setup() {
    const query = ref("");
    const selectedItem = ref();

    const filteredItems = computed(() =>
      query.value === ""
        ? items
        : items.filter((item) => {
            return item.name.toLowerCase().includes(query.value.toLowerCase());
          })
    );

    const displayValue = (item: unknown) => (item as Item).name;

    return {
      query,
      selectedItem,
      filteredItems,
      displayValue,
    };
  },
});
</script>

<style scoped></style>
