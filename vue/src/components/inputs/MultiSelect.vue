<template>
  <div>
    <Listbox v-model="selectedItem" multiple>
      <ListboxLabel
        class="block ml-1 text-sm font-medium text-left text-gray-700"
      >
        Label Here
      </ListboxLabel>
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-slate-500 sm:text-sm"
        >
          <span v-if="!selectedItem.length">{{ placeholder }}</span>
          <div v-else class="flex flex-row flex-wrap mt-1">
            <div
              v-for="(item, index) in selectedItem"
              :key="index"
              class="flex items-center px-2 py-1 mx-1 mb-1 text-xs text-white rounded-full bg-emerald-400 focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-slate-500"
              :tabindex="0"
              @keydown.space.prevent="handleChipKeydown(index)"
            >
              <span class="mr-1">{{ item.text }}</span>
              <span @click.prevent="deleteSelectedItem(index)">
                <font-awesome-icon
                  :icon="['fa', 'circle-xmark']"
                  class="z-10 text-sm text-white fill-current circle-xmark-icon input-icons"
                >
                </font-awesome-icon>
              </span>
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
            <template v-for="item in items" :key="item.id">
              <ListboxOption v-slot="{ active, selected }" :value="item">
                <li
                  :class="[
                    active ? 'text-white bg-emerald-400' : 'text-gray-900',
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
                    {{ item.text }}
                  </span>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-emerald-600',
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

interface Item {
  value: number | string;
  text: string;
}

export default defineComponent({
  name: "MultiSelect",

  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  },

  setup() {
    const items = ref<Item[]>([
      { value: 1, text: "Wade Cooper" },
      { value: 2, text: "Arlene Mccoy" },
      { value: 3, text: "Devon Webb" },
      { value: 4, text: "Tom Cook" },
      { value: 5, text: "Tanya Fox" },
      { value: 6, text: "Hellen Schmvaluet" },
      { value: 7, text: "Caroline Schultz" },
      { value: 8, text: "Mason Heaney" },
      { value: 9, text: "Claudie Smitham" },
      { value: 10, text: "Emil Schaefer" },
    ]);
    const selectedItem = ref<Item[]>([]);
    const placeholder = ref("Select value...");

    const handleChipKeydown = (index: number): void => {
      deleteSelectedItem(index);
    };

    const deleteSelectedItem = (index: number): void => {
      selectedItem.value.splice(index, 1);
    };

    return {
      items,
      selectedItem,
      placeholder,
      handleChipKeydown,
      deleteSelectedItem,
    };
  },
});
</script>

<style scoped>
.circle-xmark-icon {
  padding-top: 2px;
}
</style>
