import {
  shallowMount,
  RouterLinkStub,
  flushPromises,
  mount,
} from "@vue/test-utils";
import LoginView from "@/views/auth/LoginView.vue";

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

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

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
    it("calls the APIAuthLogin method with the correct values from the login form", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });
      useRouteMock.mockReturnValue({ push: jest.fn() });

      const wrapper = mount(
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
        APIAuthLoginMock.mockResolvedValue({
          status: 200,
          headers: {
            authorization: "Bearer fakeToken123",
          },
        });

        const wrapper = mount(
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
        expect(dispatch).toHaveBeenCalledWith(
          "LOGIN_USER",
          "Bearer fakeToken123"
        );
        wrapper.unmount();
      });
    });

    describe("the login api response returns an error", () => {
      beforeEach(() => {
        APIAuthLoginMock.mockImplementation(() => {
          return Promise.reject({
            response: {
              status: 422,
              data: {
                errors: {
                  email: ["The email is invalid"],
                  password: ["The password is required"],
                },
              },
            },
          });
        });
      });

      it("shows the login validation errors when the api returns a 422 response status", async () => {
        useStoreMock.mockReturnValue({ dispatch: jest.fn() });
        useRouteMock.mockReturnValue({ push: jest.fn() });

        const wrapper = mount(
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

        expect(wrapper.text()).toMatch("The email is invalid");
        expect(wrapper.text()).toMatch("The password is required");
      });
    });
  });
});
