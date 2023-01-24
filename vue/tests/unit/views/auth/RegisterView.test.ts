import { shallowMount, RouterLinkStub, flushPromises } from "@vue/test-utils";
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

    it("calls the APIAuthRegister method with the correct values from the login form", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });

      const wrapper = shallowMount(
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

  describe("the login api response resolves successfully", () => {
    it("the user is logged in in the store when the register api response resolves successfully", async () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({ dispatch });
      const push = jest.fn();
      useRouteMock.mockReturnValue({ push });
      APIAuthRegisterMock.mockResolvedValue({ status: 201 });

      const wrapper = shallowMount(
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
});
