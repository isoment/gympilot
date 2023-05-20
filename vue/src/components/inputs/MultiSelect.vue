<template>
  <div>
    <Listbox v-model="selectedItem" multiple :disabled="disabled">
      <ListboxLabel
        v-if="label"
        class="block ml-1 text-xs font-medium text-left text-gray-700"
        data-test="label"
      >
        {{ label }}
      </ListboxLabel>
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          data-test="listbox-button"
          @click="dropdownRefresh()"
        >
          <span
            v-if="!selectedItem.length"
            class="text-slate-500"
            data-test="placeholder"
            >{{ placeholder }}</span
          >
          <div v-else class="flex flex-row flex-wrap mt-1">
            <div
              v-for="(item, index) in selectedItem"
              :key="index"
              :class="setChipStyles"
              class="flex items-center px-2 py-1 mx-1 mb-1 text-xs text-white rounded-full"
              :tabindex="disabled ? -1 : 0"
              data-test="chip"
              @keydown.space.prevent="handleChipKeydown(index)"
            >
              <span class="mr-1" data-test="chip-text">{{ item.text }}</span>
              <span
                data-test="chip-close"
                @click.prevent="deleteSelectedItem(index)"
              >
                <font-awesome-icon
                  :icon="['fa', 'circle-xmark']"
                  class="z-10 text-sm text-white fill-current circle-xmark-icon input-icons"
                  :class="setCursorStyles"
                >
                </font-awesome-icon>
              </span>
            </div>
          </div>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2"
            :class="setCursorStyles"
            data-test="open-dialog"
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
            v-if="dropdownOpen"
            v-click-outside="resetSearch()"
            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            @keydown.escape="resetSearch()"
          >
            <div>
              <input
                v-model="search"
                type="text"
                class="w-full text-sm border-none focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
            <template v-for="item in filteredItems" :key="item.id">
              <ListboxOption v-slot="{ active, selected }" :value="item">
                <li
                  :class="[
                    active
                      ? 'text-white ' + setBackgroundColor
                      : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  ]"
                  data-test="list-options"
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
                      active ? 'text-white' : 'text-slate-600',
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
import {
  PropType,
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from "vue";
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

  props: {
    modelValue: {
      type: Array as PropType<string[] | number[]>,
      required: true,
    },
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    backgroundColor: {
      type: String as PropType<string>,
      default: "bg-emerald-400",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    label: {
      type: String as PropType<string>,
      default: null,
    },
    placeholder: {
      type: String as PropType<string>,
      default: "Select value...",
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const selectedItem = ref<Item[]>([]);
    const search = ref("");
    const dropdownOpen = ref(false);

    onMounted(() => {
      setSelectedItems();
    });

    const setBackgroundColor = computed(() => {
      return props.disabled ? "bg-slate-400" : props.backgroundColor;
    });

    const setChipStyles = computed(() => {
      return props.disabled
        ? "bg-slate-400"
        : props.backgroundColor +
            " focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500";
    });

    const setCursorStyles = computed(() => {
      return props.disabled ? "" : "cursor-pointer";
    });

    const filteredItems = computed(() => {
      return props.items.filter((item) =>
        item.text.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const setSelectedItems = (): void => {
      for (const model of props.modelValue) {
        for (const item of props.items) {
          if (model === item.value) {
            selectedItem.value.push(item);
          }
        }
      }
    };

    const handleChipKeydown = (index: number): void => {
      deleteSelectedItem(index);
    };

    const deleteSelectedItem = (index: number): void => {
      if (!props.disabled) {
        selectedItem.value.splice(index, 1);
        dropdownOpen.value = false;
      }
    };

    const dropdownRefresh = (): void => {
      dropdownOpen.value = true;
    };

    const resetSearch = (): void => {
      search.value = "";
    };

    watch(
      selectedItem,
      () => {
        const arr = [];
        for (const i of selectedItem.value) {
          arr.push(i.value);
        }
        emit("update:modelValue", arr);
      },
      { deep: true }
    );

    return {
      selectedItem,
      handleChipKeydown,
      deleteSelectedItem,
      setBackgroundColor,
      setChipStyles,
      setCursorStyles,
      search,
      filteredItems,
      resetSearch,
      dropdownOpen,
      dropdownRefresh,
    };
  },
});
</script>

<style scoped>
.circle-xmark-icon {
  padding-top: 2px;
}
</style>
