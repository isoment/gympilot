<template>
  <div>
    <Combobox
      v-model="selectedItem"
      as="div"
      :disabled="disabled"
      data-test="select"
    >
      <ComboboxLabel
        v-if="label"
        class="block ml-1 text-xs font-medium text-left text-gray-700"
        data-test="label"
        >{{ label }}</ComboboxLabel
      >
      <div class="relative mt-1">
        <ComboboxInput
          :class="disabledClasses"
          class="w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
          data-test="input"
          :display-value="displayValue"
          :placeholder="placeholder"
          @change="onInputChange"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none"
          data-test="dropdown-button"
        >
          <font-awesome-icon
            :icon="['fa', 'chevron-down']"
            class="z-10 text-xs fill-current input-icons text-slate-700"
          >
          </font-awesome-icon>
        </ComboboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ComboboxOptions
            v-if="filteredItems.length > 0"
            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ComboboxOption
              v-for="item in filteredItems"
              v-slot="{ active, selected }"
              :key="item.value"
              :value="item"
              as="template"
            >
              <li
                class="text-left"
                data-test="list-item"
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
        </transition>
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
      type: String as PropType<string>,
      default: "bg-emerald-400",
    },
    label: {
      type: String as PropType<string>,
      default: null,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    placeholder: {
      type: String as PropType<string>,
      default: "Select value...",
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const query = ref("");
    const selectedItem = ref();

    onMounted(() => {
      setSelectedItem();
    });

    const filteredItems = computed(() =>
      query.value === ""
        ? props.items
        : props.items.filter((item) => {
            return item.text.toLowerCase().includes(query.value.toLowerCase());
          })
    );

    const disabledClasses = computed(() => {
      return props.disabled ? "disabled-text" : "";
    });

    const setSelectedItem = (): void => {
      for (const i of props.items) {
        if (i.value === props.modelValue) {
          selectedItem.value = i;
        }
      }
    };

    const displayValue = (item: unknown): string => (item as Item).text;

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
      disabledClasses,
    };
  },
});
</script>

<style scoped>
.disabled-text {
  @apply text-slate-400;
}
</style>
