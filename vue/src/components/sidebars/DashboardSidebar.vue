<template>
  <div class="h-full overflow-auto">
    <div class="flex flex-col flex-grow h-full">
      <div class="flex items-center flex-shrink-0 px-4 py-5 sidebar-color">
        <img
          class="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
          alt="Workflow"
        />
      </div>
      <nav
        class="flex-1 px-2 pb-4 space-y-1 sidebar-color"
        aria-label="Sidebar"
      >
        <template v-for="item in items" :key="item.name">
          <div v-if="!item.children">
            <router-link
              :to="item.to || '/'"
              :class="[
                pathIsActive(item.to)
                  ? 'text-white font-semibold'
                  : 'sidebar-color text-slate-400 hover:text-white duration-200 transition-all',
                'sidebar-color group w-full flex items-center pl-2 py-2 text-sm font-medium focus:outline-none',
              ]"
              @click="linkClicked"
            >
              <font-awesome-icon
                :icon="item.icon"
                :class="[
                  pathIsActive(item.to) ? 'font-semibold' : '',
                  'mr-4 flex-shrink-0 h-4 w-4 text-white',
                ]"
                aria-hidden="true"
              >
              </font-awesome-icon>
              {{ item.name }}
            </router-link>
          </div>
          <Disclosure
            v-else
            v-slot="{ open }"
            as="div"
            class="space-y-1"
            :default-open="childPathIsActive(item)"
          >
            <DisclosureButton
              :class="[
                childPathIsActive(item)
                  ? 'text-white font-semibold'
                  : 'text-slate-400 hover:text-white duration-200 transition-all',
                'sidebar-color group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium focus:outline-none focus:text-white',
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
              enter-active-class="transition-all ease-linear duration-600"
              enter-from-class="origin-top-right transform opacity-0"
              enter-to-class="origin-bottom-right transform opacity-100"
              leave-active-class="transition-all ease-linear duration-600"
              leave-from-class="origin-bottom-right transform opacity-100"
              leave-to-class="origin-top-right transform opacity-0"
            >
              <DisclosurePanel
                class="ml-3.5 space-y-1 border-l-2 border-slate-600"
              >
                <router-link
                  v-for="subItem in item.children"
                  :key="subItem.name"
                  :to="subItem.to"
                  :class="[
                    pathIsActive(subItem.to)
                      ? 'font-semibold text-white ml-1'
                      : 'text-slate-400',
                    'flex items-center w-full py-2 pl-8 pr-2 text-sm font-medium transition-all duration-200 group hover:text-white focus:text-white focus:outline-none',
                  ]"
                  @click="linkClicked"
                >
                  {{ subItem.name }}
                </router-link>
              </DisclosurePanel>
            </transition>
          </Disclosure>
        </template>
      </nav>
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
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { DashboardSidebarItems } from "@/config/types";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DashboardSidebar",

  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },

  props: {
    items: {
      type: Array as PropType<DashboardSidebarItems[]>,
      required: true,
    },
  },

  emits: ["linkClicked"],

  setup(props, { emit }) {
    const route = useRoute();

    /**
     *  A helper to check if the current path matches the path passed in as a param.
     *  Useful for applying styles for the current path.
     */
    const pathIsActive = (path?: string): boolean => {
      return path === route.path;
    };

    /**
     *  If one of the children of an item matches the current path return true. This
     *  is useful for styling the parent when one of the children is selected.
     */
    const childPathIsActive = (item: DashboardSidebarItems): boolean => {
      let isActive = false;
      if (item.children) {
        for (const child of item.children) {
          if (child.to === route.path) {
            isActive = true;
            break;
          }
        }
      }
      return isActive;
    };

    /**
     *  When a link is clicked we want to emit a linkClicked event.
     */
    const linkClicked = (event: PointerEvent): void => {
      if (event.target instanceof HTMLAnchorElement) {
        emit("linkClicked", { clicked: true, path: event.target.pathname });
      }
    };

    return {
      linkClicked,
      pathIsActive,
      childPathIsActive,
    };
  },
});
</script>

<style scoped>
.sidebar-color {
  @apply bg-[#2C3849];
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #586a8a;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: #2c3849;
}
</style>
