<template>
  <div class="h-full">
    <div class="flex items-center flex-shrink-0 px-4 py-5 sidebar-color">
      <img
        class="w-auto h-8"
        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
        alt="Workflow"
      />
    </div>
    <div class="flex flex-col flex-grow h-full">
      <nav class="flex-1 px-2 space-y-1 sidebar-color" aria-label="Sidebar">
        <template v-for="item in navigation" :key="item.name">
          <div v-if="!item.children">
            <a
              href="#"
              :class="[
                item.current
                  ? 'sidebar-color text-white'
                  : 'sidebar-color text-slate-400 hover:text-white duration-200 transition-all',
                'group w-full flex items-center pl-2 py-2 text-sm font-medium focus:outline-none',
              ]"
            >
              <font-awesome-icon
                :icon="item.icon"
                :class="[
                  item.current ? 'text-white' : 'text-slate-400',
                  'mr-4 flex-shrink-0 h-4 w-4',
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
                  ? 'sidebar-color text-white'
                  : 'sidebar-color text-slate-400 hover:text-white duration-200 transition-all',
                'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium focus:outline-none focus:text-white',
              ]"
            >
              <font-awesome-icon
                :icon="item.icon"
                class="flex-shrink-0 w-4 h-4 mr-4 text-white group-hover:text-white"
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
                  class="flex items-center w-full py-2 pl-8 pr-2 text-sm font-medium transition-all duration-200 text-slate-400 group hover:text-white focus:text-white focus:outline-none"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const navigation = [
  { name: "Dashboard", icon: ["fa", "user"], current: false, href: "#" },
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

export default defineComponent({
  name: "DashboardSidebar",

  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

  setup() {
    return {
      navigation,
    };
  },
});
</script>

<style>
.sidebar-color {
  @apply bg-[#2C3849];
}
</style>
