import { mount } from "@vue/test-utils";

import ToastMessage from "@/components/toasts/ToastMessage.vue";
import ToastsList from "@/components/toasts/ToastsList.vue";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

describe("ToastsList", () => {
  const toasts = [
    {
      id: "1234abcdef98",
      type: "error",
      message: "Test toast",
    },
    {
      id: "1832zxcvb1",
      type: "success",
      message: "Other toast",
    },
  ];

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

  it("renders the correct number of ToastMessage components to the list", () => {
    useStoreMock.mockReturnValue({ state: { toasts } });

    const wrapper = mount(ToastsList, createConfig());

    expect(wrapper.findAllComponents(ToastMessage)).toHaveLength(toasts.length);
  });
});
