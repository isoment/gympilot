import { mount, shallowMount } from "@vue/test-utils";
import CheckBox from "@/components/inputs/CheckBox.vue";

describe("CheckBox", () => {
  const createConfig = (props = {}) => ({
    props: {
      label: "TestCheckbox",
      modelValue: false,
      color: "text-yellow-500",
      size: "md",
      disabled: false,
      ...props,
    },
  });

  it("displays the correct label passed in from the prop", () => {
    const wrapper = shallowMount(
      CheckBox,
      createConfig({ label: "PleaseCheckMe" })
    );
    const label = wrapper.find("[data-test='label']");
    expect(label.text()).toBe("PleaseCheckMe");
  });

  describe("the modelValue prop controls the initial checkbox state", () => {
    it("displays the checkbox as checked when the modelValue prop is true", () => {
      const wrapper = shallowMount(
        CheckBox,
        createConfig({ modelValue: true })
      );
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect((checkbox.element as HTMLInputElement).checked).toBe(true);
    });

    it("displays the checkbox as not checked when the modelValue prop is false", () => {
      const wrapper = shallowMount(
        CheckBox,
        createConfig({ modelValue: false })
      );
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect((checkbox.element as HTMLInputElement).checked).toBe(false);
    });
  });

  it("displays the correct tailwind text color class set in the color prop", () => {
    const wrapper = shallowMount(
      CheckBox,
      createConfig({ color: "text-rose-700" })
    );
    const checkbox = wrapper.find("[data-test='checkbox']");
    expect(checkbox.classes("text-rose-700")).toBe(true);
  });

  describe("the size of the checkbox can be set through the size prop", () => {
    it("sets the size of the checkbox using the small checkbox class", () => {
      const wrapper = mount(CheckBox, createConfig({ size: "sm" }));
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect(checkbox.classes()).toContain("small-checkbox");
      expect(checkbox.classes()).not.toContain("med-checkbox");
      expect(checkbox.classes()).not.toContain("large-checkbox");
    });

    it("sets the size of the checkbox using the med checkbox class", () => {
      const wrapper = mount(CheckBox, createConfig({ size: "md" }));
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect(checkbox.classes()).toContain("med-checkbox");
      expect(checkbox.classes()).not.toContain("small-checkbox");
      expect(checkbox.classes()).not.toContain("large-checkbox");
    });

    it("sets the size of the checkbox using the large checkbox class", () => {
      const wrapper = mount(CheckBox, createConfig({ size: "lg" }));
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect(checkbox.classes()).toContain("large-checkbox");
      expect(checkbox.classes()).not.toContain("med-checkbox");
      expect(checkbox.classes()).not.toContain("small-checkbox");
    });
  });

  describe("the disabled prop sets the correct component state", () => {
    it("disables the input when the prop is set to true", () => {
      const wrapper = shallowMount(CheckBox, createConfig({ disabled: true }));
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect(checkbox.attributes("disabled")).toBeDefined();
    });

    it("is enabled with the prop is false", () => {
      const wrapper = shallowMount(CheckBox, createConfig({ disabled: false }));
      const checkbox = wrapper.find("[data-test='checkbox']");
      expect(checkbox.attributes("disabled")).not.toBeDefined();
    });
  });

  it("emits 'click' event when checkbox is clicked", async () => {
    const wrapper = mount(CheckBox, createConfig());
    const input = wrapper.find('[data-test="checkbox"]');
    await input.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("emits 'update:modelValue' event when checkbox is clicked", async () => {
    const wrapper = mount(CheckBox, createConfig());
    const input = wrapper.find('[data-test="checkbox"]');
    await input.setValue(true);
    const emittedValue = wrapper.emitted("update:modelValue");
    if (emittedValue) {
      expect(emittedValue).toBeTruthy();
      expect(emittedValue[0]).toEqual([true]);
    } else {
      fail("Expected update:modelValue event to be emitted");
    }
  });
});
