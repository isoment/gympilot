import { shallowMount } from "@vue/test-utils";
import ValidationErrors from "@/components/shared/ValidationErrors.vue";

describe("ValidationErrors", () => {
  // The errors object will have errors for email and password by default
  const createConfig = (props = {}) => ({
    props: {
      errors: {
        email: "An email address is required",
        password: "A password is required",
      },
      field: "email",
      ...props,
    },
  });

  it("displays the correct validation error for the field specified", () => {
    const wrapper = shallowMount(
      ValidationErrors,
      createConfig({ field: "email" })
    );
    expect(wrapper.text()).toMatch("An email address is required");
    expect(wrapper.text()).not.toMatch("A password is required");
  });

  it("does not display an error when the field is not contained in the errors", () => {
    const wrapper = shallowMount(
      ValidationErrors,
      createConfig({ field: "name" })
    );
    expect(wrapper.text()).not.toMatch("An email address is required");
    expect(wrapper.text()).not.toMatch("A password is required");
  });

  it("does not display the error notification when the errors prop is an empty object", () => {
    const wrapper = shallowMount(
      ValidationErrors,
      createConfig({ errors: {}, field: "field" })
    );
    const errorDisplay = wrapper.find("[data-test='error-display']");
    expect(errorDisplay.exists()).toBe(false);
  });
});
