<template>
  <div>
    <Listbox v-model="selected" multiple>
      <ListboxLabel
        class="block ml-1 text-sm font-medium text-left text-gray-700"
      >
        Label Here
      </ListboxLabel>
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-slate-700 sm:text-sm"
        >
          <span v-if="!selected.length">{{ placeholder }}</span>
          <div v-else class="flex flex-row flex-wrap mt-1">
            <div
              v-for="value in selected"
              :key="value.id"
              class="px-2 py-1 mx-1 mb-1 text-xs text-white bg-indigo-400 rounded-full"
            >
              {{ value.name }}
            </div>
          </div>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <font-awesome-icon
              :icon="['fa', 'chevron-down']"
              class="z-10 text-xs fill-current input-icons text-slate-700"
            >
            </font-awesome-icon>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <template v-for="person in people" :key="person.id">
              <ListboxOption v-slot="{ active, selected }" :value="person">
                <li
                  :class="[
                    active ? 'text-white bg-indigo-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    class="text-left"
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                  >
                    {{ person.name }}
                  </span>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-indigo-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <font-awesome-icon
                      :icon="['fa', 'check']"
                      class="z-10 text-xs fill-current input-icons text-slate-700"
                    >
                    </font-awesome-icon>
                  </span>
                </li>
              </ListboxOption>
            </template>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

export default defineComponent({
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  },
  setup() {
    const people = ref([
      { id: 1, name: "Wade Cooper" },
      { id: 2, name: "Arlene Mccoy" },
      { id: 3, name: "Devon Webb" },
      { id: 4, name: "Tom Cook" },
      { id: 5, name: "Tanya Fox" },
      { id: 6, name: "Hellen Schmidt" },
      { id: 7, name: "Caroline Schultz" },
      { id: 8, name: "Mason Heaney" },
      { id: 9, name: "Claudie Smitham" },
      { id: 10, name: "Emil Schaefer" },
    ]);
    const selected = ref([]);
    const selectedValues = ref([]);
    const placeholder = ref("Select value...");

    const isItemSelected = (person: any) => {
      return selectedValues.value.some((item) => item.id === person.id);
    };

    const toggleItemSelected = (person) => {
      if (isItemSelected(person)) {
        selectedValues.value = selectedValues.value.filter(
          (item) => item.id !== person.id
        );
      } else {
        selectedValues.value.push(person);
      }
      selected.value = selectedValues.value;
    };

    return {
      people,
      selected,
      selectedValues,
      isItemSelected,
      toggleItemSelected,
      placeholder,
    };
  },
});
</script>
