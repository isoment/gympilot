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

import { useRoute, useRouter } from "vue-router";
jest.mock("vue-router", () => ({
  __esModule: true,
  ...jest.requireActual("vue-router"),
  useRouter: jest.fn(),
  useRoute: jest.fn(),
}));
const useRouteMock = useRoute as jest.Mock;

const mockRouter = {
  push: jest.fn(),
  beforeEach: (fn: Function) => fn(),
};

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

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

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
    it("calls the APIAuthRegister method with the correct values from the register form", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(
        RegisterView,
        createConfig({ attachTo: document.body })
      );

      const firstNameInput = wrapper.find("[data-test='first-name-input']");
      await firstNameInput.setValue("Test");

      const lastNameInput = wrapper.find("[data-test='last-name-input']");
      await lastNameInput.setValue("User");

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
        first_name: "Test",
        last_name: "User",
        email: "test@test.com",
        password: "password",
        password_verify: "password",
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
      APIAuthRegisterMock.mockResolvedValue({
        status: 201,
        headers: {
          authorization: "Bearer fakeToken123",
        },
      });

      const wrapper = mount(
        RegisterView,
        createConfig({ attachTo: document.body })
      );

      const firstNameInput = wrapper.find("[data-test='first-name-input']");
      await firstNameInput.setValue("Test");

      const lastNameInput = wrapper.find("[data-test='last-name-input']");
      await lastNameInput.setValue("User");

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
      expect(dispatch).toHaveBeenCalledWith(
        "LOGIN_USER",
        "Bearer fakeToken123"
      );
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
                first_name: ["The first name is required"],
                last_name: ["The last name is required"],
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

      const firstNameInput = wrapper.find("[data-test='first-name-input']");
      await firstNameInput.setValue("Test");

      const lastNameInput = wrapper.find("[data-test='last-name-input']");
      await lastNameInput.setValue("User");

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

      expect(wrapper.text()).toMatch("The first name is required");
      expect(wrapper.text()).toMatch("The last name is required");
      expect(wrapper.text()).toMatch("The email is invalid");
      expect(wrapper.text()).toMatch("The password is required");
    });
  });
});
