import { mount } from "@vue/test-utils";
import MultiSelect from "@/components/inputs/MultiSelect.vue";

describe("MultiSelect", () => {
  const items = [
    { value: 1, text: "Leslie Alexander" },
    { value: 2, text: "John Smith" },
    { value: 3, text: "Tim Franklin" },
    { value: 4, text: "Amy Brown" },
    { value: 5, text: "Fran Nolan" },
  ];

  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
      directives: {
        "click-outside": jest.fn(),
      },
    },
    props: {
      label: "MultiSelectInput",
      modelValue: [1],
      backgroundColor: "text-yellow-500",
      items: items,
      disabled: false,
      placeholder: "Select value",
      ...props,
    },
  });

  it("displays the correct label passed in from the prop", () => {
    const wrapper = mount(
      MultiSelect,
      createConfig({ label: "PleaseSelectMe" })
    );
    const label = wrapper.find("[data-test='label']");
    expect(label.text()).toBe("PleaseSelectMe");
  });

  it("displays the placeholder text when there are no items selected", () => {
    const wrapper = mount(
      MultiSelect,
      createConfig({ modelValue: [], placeholder: "Test placeholder" })
    );
    const label = wrapper.find("[data-test='placeholder']");
    expect(label.text()).toBe("Test placeholder");
  });

  describe("the component has chips for selected items", () => {
    const items = [
      { value: 1, text: "Leslie Alexander" },
      { value: 2, text: "Amy Brown" },
      { value: 3, text: "Fran Nolan" },
    ];

    it("displays the chips for the selected values", async () => {
      const wrapper = mount(
        MultiSelect,
        createConfig({ items: items, modelValue: [1, 2, 3] })
      );

      await wrapper.vm.$nextTick();
      const chips = wrapper.findAll("[data-test='chip-text']");
      expect(chips.length).toBe(3);

      const expectedNames = ["Leslie Alexander", "Amy Brown", "Fran Nolan"];

      const namesOnChips: string[] = chips.map((c) => {
        return c.text();
      });

      expect(expectedNames).toEqual(namesOnChips);
    });

    it("when the delete indicator is clicked the item is deleted", () => {});
  });
});
