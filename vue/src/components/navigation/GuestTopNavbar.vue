<template>
  <header>
    <Popover class="relative bg-white">
      <div
        class="flex items-center justify-between px-4 py-3 mx-auto md:py-5 max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <router-link to="/">
            <span class="sr-only">Logo</span>
            <img
              class="w-auto h-9 sm:h-11"
              src="../../assets/dumbbell.png"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
          >
            <span class="sr-only">Open menu</span>
            <font-awesome-icon
              :icon="['fa', 'bars']"
              class="z-10 text-2xl text-gray-900 fill-current"
              aria-hidden="true"
            >
            </font-awesome-icon>
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton
              :class="[
                open ? 'text-gray-900' : 'text-gray-500',
                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500',
              ]"
            >
              <span>Solutions</span>
              <font-awesome-icon
                :icon="['fa', 'chevron-down']"
                :class="[
                  open ? 'text-gray-600' : 'text-gray-400',
                  'ml-2 h-3 w-3 group-hover:text-gray-500',
                ]"
                aria-hidden="true"
              >
              </font-awesome-icon>
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute z-10 w-screen max-w-md mt-3 -ml-4 transform lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
              >
                <div
                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div
                    class="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8 lg:grid-cols-2"
                  >
                    <a
                      v-for="item in solutions"
                      :key="item.name"
                      :href="item.href"
                      class="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                    >
                      <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md bg-gradient-to-r from-emerald-300 to-green-500 sm:h-12 sm:w-12"
                      >
                        <font-awesome-icon
                          :icon="item.icon"
                          class="w-6 h-6 text-white"
                          aria-hidden="true"
                        >
                        </font-awesome-icon>
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <a
            href="#"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Pricing
          </a>
          <a
            href="#"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Partners
          </a>
          <a
            href="#"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Company
          </a>
        </PopoverGroup>
        <div class="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
          <router-link
            to="/login"
            class="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
          >
            Sign in
          </router-link>
          <router-link
            to="/register"
            class="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm whitespace-nowrap bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
          >
            Sign up
          </router-link>
        </div>
      </div>

      <transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <PopoverPanel
          focus
          class="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden"
        >
          <div
            class="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50"
          >
            <div class="px-5 pt-5 pb-6">
              <div class="flex items-center justify-between">
                <div>
                  <img
                    class="w-auto h-9 sm:h-11"
                    src="../../assets/dumbbell.png"
                    alt="logo"
                  />
                </div>
                <div class="-mr-2">
                  <PopoverButton
                    class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
                  >
                    <span class="sr-only">Close menu</span>
                    <font-awesome-icon
                      :icon="['fa', 'xmark']"
                      class="z-10 text-2xl text-gray-900 fill-current"
                      aria-hidden="true"
                    >
                    </font-awesome-icon>
                  </PopoverButton>
                </div>
              </div>
              <div class="mt-6">
                <nav class="grid grid-cols-1 gap-7">
                  <a
                    v-for="item in solutions"
                    :key="item.name"
                    :href="item.href"
                    class="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-50"
                  >
                    <div
                      class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md bg-gradient-to-r from-emerald-300 to-green-500"
                    >
                      <font-awesome-icon
                        :icon="item.icon"
                        class="w-6 h-6 text-white"
                        aria-hidden="true"
                      >
                      </font-awesome-icon>
                    </div>
                    <div class="ml-4 text-base font-medium text-gray-900">
                      {{ item.name }}
                    </div>
                  </a>
                </nav>
              </div>
            </div>
            <div class="px-5 py-6">
              <div class="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  class="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  class="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Partners
                </a>
                <a
                  href="#"
                  class="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Company
                </a>
              </div>
              <div class="mt-6">
                <router-link
                  to="/register"
                  class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-emerald-300 to-green-500 bg-origin-border hover:from-green-500 hover:to-green-500"
                >
                  Sign up
                </router-link>
                <p class="mt-6 text-base font-medium text-center text-gray-500">
                  Existing customer?
                  <router-link to="/login" class="text-gray-900">
                    Sign in
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

const solutions = [
  {
    name: "Inbox",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ["fa", "dumbbell"],
  },
  {
    name: "Messaging",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: ["fa", "user"],
  },
  {
    name: "Live Chat",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ["fa", "door-open"],
  },
  {
    name: "Knowledge Base",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ["fa", "check"],
  },
];

export default defineComponent({
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  },

  setup() {
    return {
      solutions,
    };
  },
});
</script>
