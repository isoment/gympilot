import { shallowMount, RouterLinkStub, flushPromises } from "@vue/test-utils";
import LoginView from "@/views/auth/LoginView.vue";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import { useRoute } from "vue-router";
jest.mock("vue-router");
const useRouteMock = useRoute as jest.Mock;

import { APIAuthCsrf } from "@/api/auth";
jest.mock("@/api/auth");
const APIAuthCsrfMock = APIAuthCsrf as jest.Mock;

import { APIAuthLogin } from "@/api/auth";
jest.mock("@/api/auth");
const APIAuthLoginMock = APIAuthLogin as jest.Mock;

describe("LoginView", () => {
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

  describe("the login component is displayed with the correct elements", () => {
    it("displays a link to reset the password", () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });
      const wrapper = shallowMount(LoginView, createConfig());
      const forgotPasswordLink = wrapper.find(
        "[data-test='forgot-password-link']"
      );
      expect(forgotPasswordLink.element).toBeInstanceOf(HTMLAnchorElement);
    });

    it("displays a link to the registration form", () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });
      const wrapper = shallowMount(LoginView, createConfig());
      const forgotPasswordLink = wrapper.find("[data-test='register-link']");
      expect(forgotPasswordLink.element).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe("the login form logic works correctly", () => {
    it("calls the APIAuthCsrf method to get the csrf token from the api", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });
      APIAuthCsrfMock.mockResolvedValue({});
      const wrapper = shallowMount(
        LoginView,
        createConfig({ attachTo: document.body })
      );
      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");
      expect(APIAuthCsrfMock).toHaveBeenCalled();
      wrapper.unmount();
    });

    it("calls the APIAuthLogin method with the correct values from the login form", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });

      const wrapper = shallowMount(
        LoginView,
        createConfig({ attachTo: document.body })
      );

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const passwordInput = wrapper.find("[data-test='password-input']");
      await passwordInput.setValue("password");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      expect(APIAuthLoginMock).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password",
      });
      wrapper.unmount();
    });

    describe("the login api response resolves successfully", () => {
      it("the user is logged in in the store when the login api response resolves successfully", async () => {
        const dispatch = jest.fn();
        useStoreMock.mockReturnValue({ dispatch });
        const push = jest.fn();
        useRouteMock.mockReturnValue({ push });
        APIAuthLoginMock.mockResolvedValue({ status: 200 });

        const wrapper = shallowMount(
          LoginView,
          createConfig({ attachTo: document.body })
        );

        const emailInput = wrapper.find("[data-test='email-input']");
        await emailInput.setValue("test@test.com");

        const passwordInput = wrapper.find("[data-test='password-input']");
        await passwordInput.setValue("password");

        const submitFormButton = wrapper.find("[data-test='submit-button']");
        await submitFormButton.trigger("click");

        await flushPromises();
        expect(dispatch).toHaveBeenCalledWith("LOGIN_USER");
        wrapper.unmount();
      });
    });

    describe("the login api response returns an error", () => {
      it("does not show the login validation when the component loads", () => {
        useStoreMock.mockReturnValue({ dispatch: jest.fn() });
        useRouteMock.mockReturnValue({ push: jest.fn() });

        const wrapper = shallowMount(LoginView, createConfig());
        const validationError = wrapper.find("[data-test='validation-error']");
        expect(validationError.exists()).toBe(false);
      });

      it("shows the login validation errors when the api returns a 422 response status", async () => {
        useStoreMock.mockReturnValue({ dispatch: jest.fn() });
        useRouteMock.mockReturnValue({ push: jest.fn() });

        APIAuthLoginMock.mockImplementation(() => {
          return Promise.reject({
            response: {
              status: 422,
            },
          });
        });

        const wrapper = shallowMount(
          LoginView,
          createConfig({ attachTo: document.body })
        );

        const emailInput = wrapper.find("[data-test='email-input']");
        await emailInput.setValue("test@test.com");

        const passwordInput = wrapper.find("[data-test='password-input']");
        await passwordInput.setValue("password");

        const submitFormButton = wrapper.find("[data-test='submit-button']");
        await submitFormButton.trigger("click");

        await flushPromises();

        const validationError = wrapper.find("[data-test='validation-error']");
        expect(validationError.exists()).toBe(true);
      });
    });
  });
});
