<template>
  <div>
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
            v-for="item in navbarItems"
            :key="item.name"
            v-slot="{ active }"
            @click="menuItemClick(item)"
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import navbarItems from "@/config/dashboardTopNav";
import { DashboardTopNavItem } from "@/config/types";
import { ADD_TOAST, LOGOUT_USER } from "@/store/constants";
import { key } from "@/store";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "DashboardNavProfile",

  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },

  setup() {
    const router = useRouter();
    const store = useStore(key);

    const menuItemClick = async (item: DashboardTopNavItem) => {
      if (item.value === "logout") {
        logout();
      }
    };

    const logout = async () => {
      await store.dispatch(LOGOUT_USER);
      router.push({ name: "login" });
      store.dispatch(ADD_TOAST, {
        type: "success",
        message: "You are now logged out",
      });
    };

    return {
      menuItemClick,
      navbarItems,
    };
  },
});
</script>
