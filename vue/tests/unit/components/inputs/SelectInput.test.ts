import { mount } from "@vue/test-utils";
import SelectInput from "@/components/inputs/SelectInput.vue";

describe("SelectInput", () => {
  const items = [
    { value: 1, text: "Leslie Alexander" },
    { value: 2, text: "John Smith" },
    { value: 3, text: "Tim Franklin" },
    { value: 4, text: "Amy Brown" },
    { value: 5, text: "Fran Nolan" },
    { value: 6, text: "Andy Black" },
    { value: 7, text: "Wanda Liu" },
  ];

  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      label: "TestSelectInput",
      modelValue: 1,
      color: "text-yellow-500",
      items: items,
      disabled: false,
      placeholder: "Select value",
      ...props,
    },
  });

  it("displays the correct label passed in from the prop", () => {
    const wrapper = mount(
      SelectInput,
      createConfig({ label: "PleaseSelectMe" })
    );
    const label = wrapper.find("[data-test='label']");
    expect(label.text()).toBe("PleaseSelectMe");
  });

  it("displays the placeholder text that is passed in through the prop", () => {
    const wrapper = mount(
      SelectInput,
      createConfig({ placeholder: "Please make a selection..." })
    );
    const input = wrapper.find("[data-test='input']");
    expect(input.attributes("placeholder")).toBe("Please make a selection...");
  });

  describe("the input can be disabled using the disabled prop", () => {
    it("disables the select component when the disabled prop is true", () => {
      const wrapper = mount(SelectInput, createConfig({ disabled: true }));
      const input = wrapper.find("[data-test='input']");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("applies the disabled-text class when the component is disabled", () => {
      const wrapper = mount(SelectInput, createConfig({ disabled: true }));
      const input = wrapper.find("[data-test='input']");
      expect(input.classes()).toContain("disabled-text");
    });

    it("is enabled when the disabled prop is false", () => {
      const wrapper = mount(SelectInput, createConfig({ disabled: false }));
      const input = wrapper.find("[data-test='input']");
      expect(input.attributes("disabled")).not.toBeDefined();
    });
  });

  it("renders the items in the items prop when the dropdown button is clicked", async () => {
    const items = [
      { value: 1, text: "Leslie Alexander" },
      { value: 2, text: "John Smith" },
      { value: 3, text: "Tim Franklin" },
    ];

    const wrapper = mount(SelectInput, createConfig({ items: items }));
    const selectButton = wrapper.find("[data-test='dropdown-button']");
    await selectButton.trigger("click");

    const renderedItems = wrapper.findAll("[data-test='list-item']");
    expect(renderedItems.length).toBe(items.length);

    // Each of the rendered items should match the items prop
    items.forEach((item, index) => {
      expect(renderedItems[index].text()).toBe(item.text);
    });
  });

  it("filters the items in the dropdown menu", async () => {
    const items = [
      { value: 1, text: "Leslie Alexander" },
      { value: 2, text: "John Smith" },
      { value: 3, text: "Tim Franklin" },
    ];

    const wrapper = mount(SelectInput, createConfig({ items: items }));
    const input = wrapper.find("[data-test='input']");

    // We want to filter the items to only include the one with the text "Frank"
    input.setValue("Frank");
    input.trigger("input");
    await wrapper.vm.$nextTick();

    // There should only be one item displayed. The one for "Tim Franklin"
    const renderedItems = wrapper.findAll("[data-test='list-item']");
    expect(renderedItems.length).toBe(1);
    expect(renderedItems[0].text()).toBe("Tim Franklin");
  });

  it("emits an event with the value when a selection is made", async () => {
    const items = [
      { value: 1, text: "Leslie Alexander" },
      { value: 2, text: "John Smith" },
      { value: 3, text: "Tim Franklin" },
    ];

    const wrapper = mount(SelectInput, createConfig({ items: items }));

    // Trigger the dropdown menu
    const selectButton = wrapper.find("[data-test='dropdown-button']");
    await selectButton.trigger("click");

    // Select the third value in the dropdown, "Tim Franklin"
    const item = wrapper.findAll("[data-test='list-item']")[2];
    await item.trigger("click");

    // We want to verify that the component emits an event when the "Tim Franklin"
    // value is selected. His value is 3 which is emitted with the event.
    const emittedValue = wrapper.emitted("update:modelValue");
    if (emittedValue) {
      expect(emittedValue).toBeTruthy();
      expect(emittedValue[emittedValue.length - 1]).toEqual([3]);
    } else {
      fail("Expected update:modelValue event to be emitted");
    }
  });
});
