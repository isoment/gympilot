import { mount } from "@vue/test-utils";
import SingleModal from "@/components/modals/SingleModal.vue";
import ResizeObserver from "resize-observer-polyfill";
import TestModalSlot from "../../../setup/test-components/TestModalSlot.vue";

// Use ResizeObserver ponyfill since Node does not support this API
global.ResizeObserver = ResizeObserver;

describe("SingleModal", () => {
  it("displays the passed-in component in the slot", async () => {
    const wrapper = mount(SingleModal, {
      props: { modelValue: true },
      slots: {
        default: TestModalSlot,
      },
    });

    // Wait for the next tick to ensure any transitions are completed
    await wrapper.vm.$nextTick();

    // Use findComponent with the name of the test component
    const testComponent = wrapper.findComponent({ name: "TestModalSlot" });
    expect(testComponent.exists()).toBe(true);
  });

  describe("the modelValue prop controls the modal state", () => {
    it("the modal is shown when the modelValue is true", async () => {
      const wrapper = mount(SingleModal, {
        props: { modelValue: true },
        slots: {
          default: TestModalSlot,
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
          default: TestModalSlot,
        },
      });

      await wrapper.vm.$nextTick();

      const modalOverlay = wrapper.findComponent({ name: "DialogOverlay" });
      expect(modalOverlay.exists()).toBe(false);
    });
  });

  describe("closing the modal", () => {
    it("emits and event", async () => {
      const wrapper = mount(SingleModal, {
        props: { modelValue: true },
        slots: {
          default: TestModalSlot,
        },
      });

      await wrapper.vm.$nextTick();

      await wrapper.findComponent({ name: "DialogOverlay" }).trigger("click");

      // Assert that the "update:modelValue" event was emitted with the correct value
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
    });
  });
});
