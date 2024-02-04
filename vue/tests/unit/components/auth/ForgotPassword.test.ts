import { mount, flushPromises } from "@vue/test-utils";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import { APIAuthForgotPassword } from "@/api/auth";
jest.mock("@/api/auth");
const APIAuthForgotPasswordMock = APIAuthForgotPassword as jest.Mock;

describe("ForgotPassword", () => {
  const createConfig = (params = {}) => {
    return {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      ...params,
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("the ForgotPassword component is displayed with the correct elements", () => {
    it("displays an input element for the email address", () => {
      const wrapper = mount(ForgotPassword, createConfig());
      const emailInput = wrapper.find("[data-test='email-input']");
      expect(emailInput.exists()).toBe(true);
    });
  });

  describe("the api call to reset the password resolves successfully", () => {
    it("calls APIAuthForgotPassword with the correct email address and emits a close modal event", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });

      const wrapper = mount(
        ForgotPassword,
        createConfig({ attachTo: document.body })
      );

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      expect(APIAuthForgotPasswordMock).toHaveBeenCalledWith({
        email: "test@test.com",
      });
      expect(wrapper.emitted("close:forgot:password:modal")).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe("the api call to reset the password returns a response error", () => {
    it("shows the email validation error on 422 response", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });

      APIAuthForgotPasswordMock.mockImplementation(() => {
        return Promise.reject({
          response: {
            status: 422,
            data: {
              errors: {
                email: ["The email is invalid"],
              },
            },
          },
        });
      });

      const wrapper = mount(
        ForgotPassword,
        createConfig({ attachTo: document.body })
      );

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      expect(wrapper.text()).toMatch("The email is invalid");
      wrapper.unmount();
    });

    it("shows the general error on 422 response", async () => {
      useStoreMock.mockReturnValue({ dispatch: jest.fn() });

      APIAuthForgotPasswordMock.mockImplementation(() => {
        return Promise.reject({
          response: {
            status: 422,
            data: {
              message: "A error happened here",
            },
          },
        });
      });

      const wrapper = mount(
        ForgotPassword,
        createConfig({ attachTo: document.body })
      );

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      expect(wrapper.text()).toMatch("A error happened here");
      wrapper.unmount();
    });

    it("displays a toast and emits a close event on a general error", async () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({ dispatch });

      APIAuthForgotPasswordMock.mockImplementation(() => {
        return Promise.reject({
          response: {
            status: 400,
            data: {
              message: "There was an error",
            },
          },
        });
      });

      const wrapper = mount(
        ForgotPassword,
        createConfig({ attachTo: document.body })
      );

      const emailInput = wrapper.find("[data-test='email-input']");
      await emailInput.setValue("test@test.com");

      const submitFormButton = wrapper.find("[data-test='submit-button']");
      await submitFormButton.trigger("click");

      await flushPromises();

      // We only care about asserting that a toast was dispatched, not it's content
      expect(dispatch).toHaveBeenCalledWith("ADD_TOAST", expect.anything());
      expect(wrapper.emitted("close:forgot:password:modal")).toBeTruthy();

      wrapper.unmount();
    });
  });
});
