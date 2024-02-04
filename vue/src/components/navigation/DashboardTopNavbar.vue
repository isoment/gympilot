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
        <DashboardNavProfile />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardNavProfile from "@/components/menus/DashboardNavProfile.vue";

export default defineComponent({
  name: "DashboardTopNavbar",

  components: { DashboardNavProfile },

  emits: ["openSidebar"],

  setup(_, { emit }) {
    const sidebarOpen = (): void => {
      emit("openSidebar", true);
    };

    return { sidebarOpen };
  },
});
</script>
