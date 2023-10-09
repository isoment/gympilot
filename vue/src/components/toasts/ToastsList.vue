<template>
  <div class="toasts-list">
    <transition-group name="slide-fade" tag="div">
      <ToastMessage v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ToastMessage from "./ToastMessage.vue";
import { key } from "../../store";
import { useStore } from "vuex";

export default defineComponent({
  name: "ToastsList",

  components: {
    ToastMessage,
  },

  setup() {
    const store = useStore(key);
    const toasts = computed(() => store.state.toasts);

    return { toasts };
  },
});
</script>

<style scoped>
.toasts-list {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 10px;
  min-width: 200px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
