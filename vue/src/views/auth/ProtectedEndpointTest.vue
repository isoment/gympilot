<template>
  <div>
    <GuestTopNavbar />
    <div class="flex justify-center w-full">
      <!-- Button -->
      <div class="mt-4">
        <button
          class="w-full px-4 py-2 font-bold text-white transition-all duration-200 bg-emerald-500 hover:bg-emerald-400 focus:outline-emerald-400"
          data-test="submit-button"
          @click.prevent="callProtectedRoute()"
        >
          Call Protected Route
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import client from "@/http/client";

import GuestTopNavbar from "@/components/navigation/GuestTopNavbar.vue";

export default defineComponent({
  name: "LoginView",

  components: { GuestTopNavbar },

  setup() {
    onMounted(() => {
      callProtectedRoute();
    });

    const callProtectedRoute = async () => {
      try {
        await client.get("/api/auth/user");
      } catch (error: any) {
        console.log(error);
      }
    };

    return { callProtectedRoute };
  },
});
</script>

<style scoped>
.input-icons {
  margin-left: 0.85rem;
}
</style>
