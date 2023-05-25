import { shallowMount } from "@vue/test-utils";
import TextInput from "@/components/inputs/TextInput.vue";

describe("TextInput", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      label: "MyEmail",
      modelValue: "test@test.com",
      disabled: false,
      placeholder: "Select value",
      ...props,
    },
  });

  describe("the label prop controls the label display correctly", () => {
    it("displays the correct label for the component", () => {
      const wrapper = shallowMount(
        TextInput,
        createConfig({ label: "MyEmail" })
      );
      const label = wrapper.find("[data-test='label']");
      expect(label.text()).toBe("MyEmail");
    });

    it("does not display the label when it is not provided", () => {
      const wrapper = shallowMount(TextInput, createConfig({ label: null }));
      const label = wrapper.find("[data-test='label']");
      expect(label.exists()).toBe(false);
    });
  });

  it("shows the placeholder text when the modelValue is empty", () => {
    const wrapper = shallowMount(
      TextInput,
      createConfig({ modelValue: "", placeholder: "Test Placeholder" })
    );
    const input = wrapper.find("[data-test='input']");
    expect(input.attributes("placeholder")).toBe("Test Placeholder");
  });

  it("shows the correct value in the input based on the modelValue", () => {
    const wrapper = shallowMount(
      TextInput,
      createConfig({ modelValue: "TESTVALUE" })
    );
    const input = wrapper.find("[data-test='input']")
      .element as HTMLInputElement;
    expect(input.value).toBe("TESTVALUE");
  });

  describe("the disabled prop controls the inputs disabled state", () => {
    it("disabled the component when disabled prop is true", () => {
      const wrapper = shallowMount(TextInput, createConfig({ disabled: true }));
      const input = wrapper.find("[data-test='input']");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("does not disable the component when disabled prop is true", () => {
      const wrapper = shallowMount(
        TextInput,
        createConfig({ disabled: false })
      );
      const input = wrapper.find("[data-test='input']");
      expect(input.attributes("disabled")).not.toBeDefined();
    });
  });

  describe("the input can show or hide an icon based on the correct props", () => {
    it("does not display an icon component when the props are not set", () => {
      // The icon prop is not set, we should not see an icon
      const props = {
        label: "MyEmail",
        modelValue: "test@test.com",
        disabled: false,
        placeholder: "Select value",
      };

      const wrapper = shallowMount(TextInput, createConfig(props));
      const icon = wrapper.find("[data-test='icon']");
      expect(icon.exists()).toBe(false);
    });

    it("displays an icon component when the icon prop is set", () => {
      const wrapper = shallowMount(
        TextInput,
        createConfig({ icon: ["fa", "user"] })
      );
      const icon = wrapper.find("[data-test='icon']");
      expect(icon.exists()).toBe(true);
    });
  });

  it("emits 'update:modelValue' event when input is changed", async () => {
    const wrapper = shallowMount(TextInput, createConfig());
    const input = wrapper.find("[data-test='input']");

    input.setValue("fakemail@test.com");
    input.trigger("input");
    await wrapper.vm.$nextTick();

    const emittedValue = wrapper.emitted("update:modelValue");
    if (emittedValue) {
      expect(emittedValue).toBeTruthy();
      expect(emittedValue).toStrictEqual([["fakemail@test.com"]]);
    } else {
      fail("Expected update:modelValue event to be emitted");
    }
  });
});
