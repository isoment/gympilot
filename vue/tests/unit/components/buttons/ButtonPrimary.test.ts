import { shallowMount } from "@vue/test-utils";
import ButtonPrimary from "@/components/buttons/ButtonPrimary.vue";

describe("ButtonPrimary", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      text: "Test Button",
      disabled: false,
      color: "bg-yellow-400",
      hover: "hover:bg-yellow-600",
      ...props,
    },
  });

  it("displays the correct text for the button", () => {
    const wrapper = shallowMount(
      ButtonPrimary,
      createConfig({ text: "PleaseClickMe" })
    );
    const button = wrapper.find("[data-test='button']");
    expect(button.text()).toBe("PleaseClickMe");
  });

  describe("the disabled prop controls if the button is disabled or now", () => {
    it("disables the button when prop is true", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ disabled: true })
      );
      const button = wrapper.find("[data-test='button']");
      expect(button.attributes("disabled")).toBeDefined();
    });

    it("does not disable the button when prop is false", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ disabled: false })
      );
      const button = wrapper.find("[data-test='button']");
      expect(button.attributes("disabled")).not.toBeDefined();
    });
  });

  it("sets the color of the button", () => {
    const wrapper = shallowMount(
      ButtonPrimary,
      createConfig({ color: "bg-sky-400" })
    );
    const button = wrapper.find("[data-test='button']");
    expect(button.classes()).toContain("bg-sky-400");
  });

  it("sets the hover color of the button", () => {
    const wrapper = shallowMount(
      ButtonPrimary,
      createConfig({ hover: "hover:bg-sky-400" })
    );
    const button = wrapper.find("[data-test='button']");
    expect(button.classes()).toContain("hover:bg-sky-400");
  });

  describe("the input can show or hide an icon based on the correct props", () => {
    it("does not display an icon component when the props are not set", () => {
      const wrapper = shallowMount(ButtonPrimary, createConfig());
      const icon = wrapper.find("[data-test='icon']");
      expect(icon.exists()).toBe(false);
    });

    it("displays an icon component when the icon prop is set", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ icon: ["fa", "user"] })
      );
      const icon = wrapper.find("[data-test='icon']");
      expect(icon.exists()).toBe(true);
    });

    it("displays the icon on the right side when the iconPosition prop is set to right", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ icon: ["fa", "user"], iconPosition: "right" })
      );
      const button = wrapper.find("[data-test='button']");
      expect(button.classes()).toContain("flex-row-reverse");
    });

    it("sets the small icon class when the size prop is small", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ icon: ["fa", "user"], size: "small" })
      );
      const icon = wrapper.find("[data-test='icon']");
      expect(icon.classes()).toContain("icon-small");
    });

    it("sets the base icon class when the size prop is base or larger", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ icon: ["fa", "user"], size: "base" })
      );
      const icon = wrapper.find("[data-test='icon']");
      expect(icon.classes()).toContain("icon-base");
    });
  });

  describe("the size prop controls the button size", () => {
    it("sets the correct classes for the small button", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ size: "small" })
      );
      const button = wrapper.find("[data-test='button']");
      expect(button.classes()).toContain("padding-small");
      const text = wrapper.find("[data-test='text']");
      expect(text.classes()).toContain("text-small");
    });

    it("sets the correct classes for the base button", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ size: "base" })
      );
      const button = wrapper.find("[data-test='button']");
      expect(button.classes()).toContain("padding-base");
      const text = wrapper.find("[data-test='text']");
      expect(text.classes()).toContain("text-normal");
    });

    it("sets the correct classes for the large button", () => {
      const wrapper = shallowMount(
        ButtonPrimary,
        createConfig({ size: "large" })
      );
      const button = wrapper.find("[data-test='button']");
      expect(button.classes()).toContain("padding-large");
      const text = wrapper.find("[data-test='text']");
      expect(text.classes()).toContain("text-large");
    });
  });
});
