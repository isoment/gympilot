import { mount } from "@vue/test-utils";
import SingleModal from "@/components/modals/SingleModal.vue";
import ResizeObserver from "resize-observer-polyfill";

// Use ResizeObserver ponyfill.
global.ResizeObserver = ResizeObserver;

describe("SingleModal", () => {
  const createSlotContent = (): string => {
    return `<div class="relative inline-block overflow-hidden align-bottom transition-all transform" data-test="slot-content"><input type="text" /></div>`;
  };

  describe("the modelValue prop controls the modal state", () => {
    it("the modal is shown when the modelValue is true", async () => {
      const wrapper = mount(SingleModal, {
        props: { modelValue: true },
        slots: {
          default: createSlotContent(),
        },
      });

      await wrapper.vm.$nextTick();

      const modalOverlay = wrapper.findComponent({ name: "DialogOverlay" });
      expect(modalOverlay.isVisible()).toBe(true);
    });

    it("the modal is not shown when the modelValue is false", async () => {
      const wrapper = mount(SingleModal, {
        props: { modelValue: false },
        slots: {
          default: createSlotContent(),
        },
      });

      await wrapper.vm.$nextTick();

      const modalOverlay = wrapper.findComponent({ name: "DialogOverlay" });
      expect(modalOverlay.exists()).toBe(false);
    });
  });
});
