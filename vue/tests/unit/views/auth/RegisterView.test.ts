import {
  shallowMount,
  RouterLinkStub,
  flushPromises,
  mount,
} from "@vue/test-utils";
import RegisterView from "@/views/auth/RegisterView.vue";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import { useRoute } from "vue-router";
jest.mock("vue-router");
const useRouteMock = useRoute as jest.Mock;

import { APIAuthCsrf } from "@/api/auth";
jest.mock("@/api/auth");
const APIAuthCsrfMock = APIAuthCsrf as jest.Mock;

import { APIAuthRegister } from "@/api/auth";
jest.mock("@/api/auth");
const APIAuthRegisterMock = APIAuthRegister as jest.Mock;

describe("RegisterView", () => {
  const createConfig = (params = {}) => {
    return {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          "router-link": RouterLinkStub,
        },
      },
      ...params,
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("the register component is displayed with the correct elements", () => {
    it("displays a link to the login form", () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });
      const wrapper = shallowMount(RegisterView, createConfig());
      const forgotPasswordLink = wrapper.find("[data-test='login-link']");
      expect(forgotPasswordLink.element).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("the register form logic works correctly", () => {
    it("calls the APIAuthCsrf method to get the csrf token from the api", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });
      APIAuthCsrfMock.mockResolvedValue({});
      const wrapper = shallowMount(
        RegisterView,
        createConfig({ attachTo: document.body })
      );
      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");
      expect(APIAuthCsrfMock).toHaveBeenCalled();
      wrapper.unmount();
    });

    it("calls the APIAuthRegister method with the correct values from the register form", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(
        RegisterView,
        createConfig({ attachTo: document.body })
      );

      const nameInput = wrapper.find("[data-test='name-input']");
      await nameInput.setValue("Test User");

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const passwordInput = wrapper.find("[data-test='password-input']");
      await passwordInput.setValue("password");

      const passwordConfirmInput = wrapper.find(
        "[data-test='password-confirm-input']"
      );
      await passwordConfirmInput.setValue("password");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      expect(APIAuthRegisterMock).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@test.com",
        password: "password",
        password_confirmation: "password",
      });
      wrapper.unmount();
    });
  });

  describe("the register api response resolves successfully", () => {
    it("the LOGIN_USER action is called in the vuex store", async () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({ dispatch });
      const push = jest.fn();
      useRouteMock.mockReturnValue({ push });
      APIAuthRegisterMock.mockResolvedValue({ status: 201 });

      const wrapper = mount(
        RegisterView,
        createConfig({ attachTo: document.body })
      );

      const nameInput = wrapper.find("[data-test='name-input']");
      await nameInput.setValue("Test User");

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const passwordInput = wrapper.find("[data-test='password-input']");
      await passwordInput.setValue("password");

      const passwordConfirmInput = wrapper.find(
        "[data-test='password-confirm-input']"
      );
      await passwordConfirmInput.setValue("password");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();
      expect(dispatch).toHaveBeenCalledWith("LOGIN_USER");
      wrapper.unmount();
    });
  });

  describe("the register api response returns an error", () => {
    // Mock out a 422 response with some validation errors
    beforeEach(() => {
      APIAuthRegisterMock.mockImplementation(() => {
        return Promise.reject({
          response: {
            status: 422,
            data: {
              errors: {
                name: ["The name is required"],
                email: ["The email is invalid"],
                password: ["The password is required"],
              },
            },
          },
        });
      });
    });

    it("shows the register validation errors when the api returns a 422 response status", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(
        RegisterView,
        createConfig({ attachTo: document.body })
      );

      const nameInput = wrapper.find("[data-test='name-input']");
      await nameInput.setValue("Test User");

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const passwordInput = wrapper.find("[data-test='password-input']");
      await passwordInput.setValue("password");

      const passwordConfirmInput = wrapper.find(
        "[data-test='password-confirm-input']"
      );
      await passwordConfirmInput.setValue("password");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      expect(wrapper.text()).toMatch("The name is required");
      expect(wrapper.text()).toMatch("The email is invalid");
      expect(wrapper.text()).toMatch("The password is required");
    });
  });
});
