<template>
  <div class="grid h-screen grid-cols-5">
    <div class="col-span-1">
      <DashboardSidebar />
    </div>
    <div class="h-full col-span-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardSidebar from "@/components/sidebars/DashboardSidebar.vue";

export default defineComponent({
  name: "DashboardLayout",

  components: {
    DashboardSidebar,
  },

  setup() {},
});
</script>
