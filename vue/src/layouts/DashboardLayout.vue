<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="bg-gray-50">
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 z-40 flex md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-700 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex flex-col flex-1 w-full max-w-xs bg-gray-700"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 pt-2">
                <button
                  type="button"
                  class="flex items-center justify-center w-10 h-10 ml-1 text-gray-900 rounded-full focus:outline-none"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <font-awesome-icon
                    :icon="['fa', 'xmark']"
                    class="z-10 text-xl text-white fill-current input-icons"
                    aria-hidden="true"
                  >
                  </font-awesome-icon>
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex items-center flex-shrink-0 px-4">
                <img
                  class="w-auto h-8"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav class="px-2 mt-5 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  ]"
                >
                  <font-awesome-icon
                    :icon="['fa', 'user']"
                    class="z-10 mr-2 text-xs fill-current input-icons text-white-400"
                  >
                  </font-awesome-icon>
                  {{ item.name }}
                </a>
              </nav>
            </div>
            <div class="flex flex-shrink-0 p-4 bg-gray-700">
              <a href="#" class="flex-shrink-0 block group">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block w-10 h-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-base font-medium text-white">Tom Cook</p>
                    <p
                      class="text-sm font-medium text-gray-400 group-hover:text-gray-300"
                    >
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Sidebar -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div class="flex items-center flex-shrink-0 px-4 py-5 bg-slate-700">
        <img
          class="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
          alt="Workflow"
        />
      </div>
      <div class="flex flex-col flex-grow">
        <nav class="flex-1 px-2 space-y-1 bg-slate-700" aria-label="Sidebar">
          <template v-for="item in navigation" :key="item.name">
            <div v-if="!item.children">
              <a
                href="#"
                :class="[
                  item.current
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-700 text-white hover:text-white',
                  'group w-full flex items-center pl-2 py-2 text-sm font-medium',
                ]"
              >
                <font-awesome-icon
                  :icon="item.icon"
                  :class="[
                    item.current ? 'text-white' : 'text-white',
                    'mr-3 flex-shrink-0 h-4 w-4',
                  ]"
                  aria-hidden="true"
                >
                </font-awesome-icon>
                {{ item.name }}
              </a>
            </div>
            <Disclosure v-else v-slot="{ open }" as="div" class="space-y-1">
              <DisclosureButton
                :class="[
                  item.current
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-700 text-white hover:text-white',
                  'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500',
                ]"
              >
                <font-awesome-icon
                  :icon="item.icon"
                  class="flex-shrink-0 w-4 h-4 mr-3 text-white group-hover:text-white"
                  aria-hidden="true"
                >
                </font-awesome-icon>
                <span class="flex-1">
                  {{ item.name }}
                </span>
                <svg
                  :class="[
                    open ? 'text-white rotate-90' : 'text-white',
                    'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-500',
                  ]"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                    fill="currentColor"
                  ></path>
                </svg>
              </DisclosureButton>
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <DisclosurePanel
                  class="ml-3.5 space-y-1 border-l-2 border-slate-600"
                >
                  <DisclosureButton
                    v-for="subItem in item.children"
                    :key="subItem.name"
                    as="a"
                    :href="subItem.href"
                    class="flex items-center w-full py-2 pl-8 pr-2 text-sm font-medium text-white group hover:text-white"
                  >
                    {{ subItem.name }}
                  </DisclosureButton>
                </DisclosurePanel>
              </transition>
            </Disclosure>
          </template>
        </nav>
      </div>
    </div>
    <!-- Navigation Bar -->
    <div class="flex flex-col flex-1 md:pl-64">
      <div class="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 my-3 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <font-awesome-icon
            :icon="['fa', 'bars']"
            class="z-10 text-xl text-gray-900 fill-current input-icons"
            aria-hidden="true"
          >
          </font-awesome-icon>
        </button>
        <div class="flex justify-between flex-1 px-4">
          <div class="flex flex-1">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                >
                  <SearchIcon class="w-5 h-5" aria-hidden="true" />
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
              class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="w-6 h-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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
                    v-for="item in userNavigation"
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

      <main class="flex-1">
        <div class="py-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";

const navigation = [
  { name: "Dashboard", icon: ["fa", "user"], current: true, href: "#" },
  {
    name: "Team",
    icon: ["fa", "user"],
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Projects",
    icon: ["fa", "lock"],
    current: false,
    children: [{ name: "Settings", href: "#" }],
  },
  {
    name: "Calendar",
    icon: ["fa", "door-open"],
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
  {
    name: "Reports",
    icon: ["fa", "check"],
    current: false,
    children: [
      { name: "Overview", href: "#" },
      { name: "Members", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  setup() {
    const sidebarOpen = ref(false);
    return {
      navigation,
      userNavigation,
      sidebarOpen,
    };
  },
});
</script>
