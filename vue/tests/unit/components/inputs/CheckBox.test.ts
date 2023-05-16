import { mount, shallowMount, flushPromises } from "@vue/test-utils";
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

  // Using setTimeout is kind of hacky. None of the other methods seemed to work. Revisit if time allows
  describe("the size of the component can be set through the size prop", () => {
    it("applies the small-checkbox class when the size prop is sm", async () => {
      const wrapper = mount(CheckBox, createConfig({ size: "sm" }));
      setTimeout(() => {
        const checkbox = wrapper.find("[data-test='checkbox']");
        expect(checkbox.classes()).toContain("small-checkbox");
        expect(checkbox.classes()).not.toContain("med-checkbox");
        expect(checkbox.classes()).not.toContain("large-checkbox");
      }, 1500);
    });

    it("applies the med-checkbox class when the size prop is md", async () => {
      const wrapper = mount(CheckBox, createConfig({ size: "md" }));
      setTimeout(() => {
        const checkbox = wrapper.find("[data-test='checkbox']");
        expect(checkbox.classes()).toContain("med-checkbox");
        expect(checkbox.classes()).not.toContain("small-checkbox");
        expect(checkbox.classes()).not.toContain("large-checkbox");
      }, 1500);
    });

    it("applies the large-checkbox class when the size prop is md", async () => {
      const wrapper = mount(CheckBox, createConfig({ size: "lg" }));
      setTimeout(() => {
        const checkbox = wrapper.find("[data-test='checkbox']");
        expect(checkbox.classes()).toContain("large-checkbox");
        expect(checkbox.classes()).not.toContain("small-checkbox");
        expect(checkbox.classes()).not.toContain("med-checkbox");
      }, 1500);
    });
  });

  it("disables the input when the disabled prop is set to true", () => {
    const wrapper = shallowMount(CheckBox, createConfig({ disabled: true }));
    const checkbox = wrapper.find("[data-test='checkbox']");
    setTimeout(() => {
      expect(checkbox.attributes("disabled")).toBe("disabled");
    }, 1500);
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
