<template>
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
                    class="z-10 text-xl text-white fill-current"
                    aria-hidden="true"
                  >
                  </font-awesome-icon>
                </button>
              </div>
            </TransitionChild>
            <DashboardSidebar
              :items="sidebarItems"
              @link-clicked="handleSidebarLinkClick"
            />
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Sidebar -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <DashboardSidebar
        :items="sidebarItems"
        @link-clicked="handleSidebarLinkClick"
      />
    </div>

    <div class="flex flex-col flex-1 md:pl-64">
      <!-- Top Navigation Bar -->
      <DashboardTopNavbar @open-sidebar="sidebarOpen = true" />
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
} from "@headlessui/vue";
import DashboardSidebar from "@/components/sidebars/DashboardSidebar.vue";
import DashboardTopNavbar from "@/components/navigation/DashboardTopNavbar.vue";
import sidebarItems from "@/config/dashboardSidebar";
import { SideBarLinkClickedEvent } from "@/events/types";

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    DashboardSidebar,
    DashboardTopNavbar,
  },

  setup() {
    const sidebarOpen = ref(false);

    const handleSidebarLinkClick = (e: SideBarLinkClickedEvent): void => {
      if (sidebarOpen.value === true && e.clicked) {
        sidebarOpen.value = false;
      }
    };

    return {
      sidebarOpen,
      sidebarItems,
      handleSidebarLinkClick,
    };
  },
});
</script>
