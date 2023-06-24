<template>
  <div class="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow">
    <button
      type="button"
      class="pl-3 pr-3 my-3 ml-1 border-r border-gray-200 rounded text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 md:hidden"
      @click="sidebarOpen()"
    >
      <span class="sr-only">Open sidebar</span>
      <font-awesome-icon
        :icon="['fa', 'bars']"
        class="z-10 mt-1 text-xl text-gray-900 fill-current"
        aria-hidden="true"
      >
      </font-awesome-icon>
    </button>
    <div class="flex justify-between flex-1 px-4">
      <div class="flex flex-1">
        <form class="flex w-full md:ml-0" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div
              class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
            >
              <font-awesome-icon
                :icon="['fa', 'magnifying-glass']"
                class="z-10 w-4 h-4 text-gray-900 fill-current"
                aria-hidden="true"
              >
              </font-awesome-icon>
            </div>
            <input
              id="search-field"
              class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      <div class="flex items-center ml-4 md:ml-6">
        <button
          type="button"
          class="p-1 text-gray-400 bg-white rounded hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          <span class="sr-only">View notifications</span>
          <font-awesome-icon
            :icon="['far', 'bell']"
            class="z-10 w-6 h-6 mt-1 fill-current text-slate-700"
            aria-hidden="true"
          >
          </font-awesome-icon>
        </button>

        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem
                v-for="item in items"
                :key="item.name"
                v-slot="{ active }"
              >
                <a
                  :href="item.href"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >{{ item.name }}</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { DashboardTopNavItems } from "@/config/types";

export default defineComponent({
  name: "DashboardTopNavbar",

  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },

  props: {
    items: {
      type: Array as PropType<DashboardTopNavItems[]>,
      required: true,
    },
  },

  emits: ["openSidebar"],

  setup(props, { emit }) {
    const sidebarOpen = (): void => {
      emit("openSidebar", true);
    };

    return { sidebarOpen };
  },
});
</script>
