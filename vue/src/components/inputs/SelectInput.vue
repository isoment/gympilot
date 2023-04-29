<template>
  <div>
    <Combobox v-model="selectedItem" as="div">
      <ComboboxLabel
        v-if="label"
        class="block ml-1 text-sm font-medium text-left text-gray-700"
        >{{ label }}</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          class="w-full py-2 pl-3 pr-10 bg-white border border-gray-300 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-700 sm:text-sm"
          :display-value="displayValue"
          @change="onInputChange"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none"
        >
          <font-awesome-icon
            :icon="['fa', 'chevron-down']"
            class="z-10 text-xs fill-current input-icons text-slate-700"
          >
          </font-awesome-icon>
        </ComboboxButton>
        <ComboboxOptions
          v-if="filteredItems.length > 0"
          class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="item in filteredItems"
            v-slot="{ active, selected }"
            :key="item.value"
            :value="item"
            as="template"
          >
            <li
              :class="[
                'relative cursor-default select-none py-2 pl-3 pr-9',
                active ? color + ' text-white' : 'text-gray-900',
              ]"
            >
              <span :class="['block truncate', selected && 'font-semibold']">
                {{ item.text }}
              </span>
              <span
                v-if="selected"
                :class="[
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                  active ? 'text-white' : 'text-slate-600',
                ]"
              >
                <font-awesome-icon
                  :icon="['fa', 'check']"
                  class="z-10 text-xs fill-current input-icons text-slate-700"
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
  defineComponent,
  computed,
  ref,
  PropType,
  onMounted,
  watch,
} from "vue";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

interface Item {
  value: number | string;
  text: string;
}

type ComboboxInputChangeEvent = Event & { target: HTMLInputElement };

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

  props: {
    modelValue: {
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    color: {
      type: String,
      default: "bg-emerald-300",
    },
    label: {
      type: String,
      default: null,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const query = ref("");
    const selectedItem = ref();

    onMounted(() => {
      setSelectedItem();
    });

    const setSelectedItem = (): void => {
      for (const i of props.items) {
        if (i.value === props.modelValue) {
          selectedItem.value = i;
        }
      }
    };

    const filteredItems = computed(() =>
      query.value === ""
        ? props.items
        : props.items.filter((item) => {
            return item.text.toLowerCase().includes(query.value.toLowerCase());
          })
    );

    const displayValue = (item: unknown) => (item as Item).text;

    const onInputChange = (event: ComboboxInputChangeEvent): void => {
      query.value = event.target.value;
    };

    watch(selectedItem, () => {
      emit("update:modelValue", selectedItem.value.value);
    });

    return {
      query,
      selectedItem,
      filteredItems,
      displayValue,
      onInputChange,
    };
  },
});
</script>

<style scoped></style>
