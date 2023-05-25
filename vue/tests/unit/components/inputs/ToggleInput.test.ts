import { mount } from "@vue/test-utils";
import ToggleInput from "@/components/inputs/ToggleInput.vue";

describe("ToggleInput", () => {
  const createConfig = (props = {}) => ({
    props: {
      label: "MyToggle",
      modelValue: false,
      disabled: false,
      labelPosition: "top",
      size: "base",
      ...props,
    },
  });

  describe("the label behavior can be set by props", () => {
    it("it display the label that is passed in as a prop", () => {
      const wrapper = mount(
        ToggleInput,
        createConfig({ label: "MyToggleLabel" })
      );
      const label = wrapper.find("[data-test='label']");
      expect(label.text()).toBe("MyToggleLabel");
    });

    it("applies the correct class to the label when the toggle is large size", () => {
      const wrapper = mount(ToggleInput, createConfig({ size: "large" }));
      const label = wrapper.find("[data-test='label']");
      const classes = label.classes();
      expect(classes).toEqual(expect.arrayContaining(["large-label"]));
    });

    it("applies the correct class to the label when the toggle is base size", () => {
      const wrapper = mount(ToggleInput, createConfig({ size: "base" }));
      const label = wrapper.find("[data-test='label']");
      const classes = label.classes();
      expect(classes).toEqual(expect.arrayContaining(["base-label"]));
    });
  });

  describe("the input can be disabled using the disabled prop", () => {
    it("disables the switch component when the disabled prop is true", () => {
      const wrapper = mount(ToggleInput, createConfig({ disabled: true }));
      const toggle = wrapper.find("[data-test='switch']");
      expect(toggle.attributes("disabled")).toBeDefined();
    });

    it("does not disable the switch component when the disabled prop is false", () => {
      const wrapper = mount(ToggleInput, createConfig({ disabled: false }));
      const toggle = wrapper.find("[data-test='switch']");
      expect(toggle.attributes("disabled")).not.toBeDefined();
    });
  });

  describe("the correct positioning classes are applied based on the labelPosition prop", () => {
    it("positions the label on top of the toggle using flex", () => {
      const wrapper = mount(
        ToggleInput,
        createConfig({ labelPosition: "top" })
      );
      const toggleWrapper = wrapper.find("[data-test='wrapper']");
      const classes = toggleWrapper.classes();
      expect(classes).toEqual(
        expect.arrayContaining(["flex", "flex-col", "items-start"])
      );
    });

    it("positions the label on the bottom of the toggle using flex", () => {
      const wrapper = mount(
        ToggleInput,
        createConfig({ labelPosition: "bottom" })
      );
      const toggleWrapper = wrapper.find("[data-test='wrapper']");
      const classes = toggleWrapper.classes();
      expect(classes).toEqual(
        expect.arrayContaining(["flex", "flex-col-reverse", "items-start"])
      );
    });

    it("positions the label on the left of the toggle using flex", () => {
      const wrapper = mount(
        ToggleInput,
        createConfig({ labelPosition: "left" })
      );
      const toggleWrapper = wrapper.find("[data-test='wrapper']");
      const classes = toggleWrapper.classes();
      expect(classes).toEqual(
        expect.arrayContaining(["flex", "flex-row", "items-center"])
      );
    });

    it("positions the label on the right of the toggle using flex", () => {
      const wrapper = mount(
        ToggleInput,
        createConfig({ labelPosition: "right" })
      );
      const toggleWrapper = wrapper.find("[data-test='wrapper']");
      const classes = toggleWrapper.classes();
      expect(classes).toEqual(
        expect.arrayContaining(["flex", "flex-row-reverse", "items-center"])
      );
    });
  });

  describe("the toggle emits an event with the correct input when clicked", () => {
    it("emits an event with a true value when the toggle is toggled on", async () => {
      const wrapper = mount(ToggleInput, createConfig({ modelValue: false }));
      const toggle = wrapper.find("[data-test='switch']");

      await toggle.trigger("click");

      const emittedValue = wrapper.emitted("update:modelValue");
      if (emittedValue) {
        expect(emittedValue).toBeTruthy();
        expect(emittedValue[0]).toEqual([true]);
      } else {
        fail("Expected update:modelValue event to be emitted");
      }
    });

    it("emits an event with a false value when the toggle is toggled off", async () => {
      const wrapper = mount(ToggleInput, createConfig({ modelValue: true }));
      const toggle = wrapper.find("[data-test='switch']");

      await toggle.trigger("click");

      const emittedValue = wrapper.emitted("update:modelValue");
      if (emittedValue) {
        expect(emittedValue).toBeTruthy();
        expect(emittedValue[0]).toEqual([false]);
      } else {
        fail("Expected update:modelValue event to be emitted");
      }
    });
  });
});
