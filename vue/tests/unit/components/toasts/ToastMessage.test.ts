import { mount } from "@vue/test-utils";
import ToastMessage from "@/components/toasts/ToastMessage.vue";
import { REMOVE_TOAST } from "@/store/constants";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

describe("ToastMessage", () => {
  const toast = {
    id: "Duj18ha018iVAdj09h8h8Bi7O8aN",
    type: "error",
    message: "Test Message",
  };

  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      toast,
      ...props,
    },
  });

  it("renders the toast message", () => {
    useStoreMock.mockReturnValue({ dispatch: jest.fn() });
    const wrapper = mount(ToastMessage, createConfig());
    const message = wrapper.find("[data-test='toast-message']");
    expect(message.text()).toBe(toast.message);
  });

  it("dispatches the REMOVE_TOAST action removing the toast from the vuex store", () => {
    jest.useFakeTimers();

    const dispatch = jest.fn();
    useStoreMock.mockReturnValue({ dispatch });

    mount(ToastMessage, createConfig());

    jest.runOnlyPendingTimers();

    expect(dispatch).toHaveBeenCalledWith(REMOVE_TOAST, toast);
    jest.useRealTimers();
  });
});
