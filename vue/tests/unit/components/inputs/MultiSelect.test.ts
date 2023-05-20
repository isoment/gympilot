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

  it("sets the background of the current item in the dropdown based on the backgroundColor prop", async () => {
    const wrapper = mount(
      MultiSelect,
      createConfig({ backgroundColor: "text-red-600" })
    );

    const open = wrapper.find("[data-test='open-dialog']");
    await open.trigger("click");

    const option = wrapper.findAll("[data-test='list-options']")[0];
    await option.trigger("mouseover");
    expect(option.classes()).toContain("text-red-600");
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

    it("deletes the chip for the selected item when the indicator is clicked", async () => {
      const wrapper = mount(
        MultiSelect,
        createConfig({ items: items, modelValue: [1, 2, 3] })
      );

      await wrapper.vm.$nextTick();
      const chips = wrapper.findAll("[data-test='chip-close']");

      // There should be 3 chips, select the second one which is Amy Brown and click delete
      expect(chips.length).toBe(3);
      const amyBrown = chips[1];
      await amyBrown.trigger("click");

      // Get the names from the remaining chips, there should now be two and the text should
      // match the values in expectedNames.
      const updatedChips = wrapper.findAll("[data-test='chip-text']");
      expect(updatedChips.length).toBe(2);
      const expectedNames = ["Leslie Alexander", "Fran Nolan"];
      const namesOnChips: string[] = updatedChips.map((c) => {
        return c.text();
      });

      expect(expectedNames).toEqual(namesOnChips);
    });

    it("adds a chip when an item in the dropdown is clicked", async () => {
      const wrapper = mount(
        MultiSelect,
        createConfig({ items: items, modelValue: [] })
      );

      // There should be 0 chips now.
      await wrapper.vm.$nextTick();
      const chips = wrapper.findAll("[data-test='chip-text']");
      expect(chips.length).toBe(0);

      // Open the dropdown dialog
      const open = wrapper.find("[data-test='open-dialog']");
      await open.trigger("click");

      // Click the first item "Leslie Alexander"
      const optionOne = wrapper.findAll("[data-test='list-options']")[0];
      await optionOne.trigger("click");

      const updatedChips = wrapper.findAll("[data-test='chip-text']");
      expect(updatedChips.length).toBe(1);
      expect(updatedChips[0].text()).toBe("Leslie Alexander");
    });

    it("the keydown space event will delete a chip", async () => {
      const wrapper = mount(
        MultiSelect,
        createConfig({ items: items, modelValue: [1] })
      );

      // There should be one chip.
      await wrapper.vm.$nextTick();
      const chips = wrapper.findAll("[data-test='chip-text']");
      expect(chips.length).toBe(1);

      const chip = wrapper.findAll("[data-test='chip']")[0];
      await chip.trigger("keydown", {
        key: "Space",
      });

      const updatedChips = wrapper.findAll("[data-test='chip-text']");
      expect(updatedChips.length).toBe(0);
    });
  });

  describe("the disabled prop determines if the component is disabled or not", () => {
    it("disables the list box component when disabled prop is true", () => {
      const wrapper = mount(MultiSelect, createConfig({ disabled: true }));
      const button = wrapper.find("[data-test='listbox-button']");
      expect(button.attributes("disabled")).toBeDefined();
    });

    it("does not disable the list box component when disabled prop is false", () => {
      const wrapper = mount(MultiSelect, createConfig({ disabled: false }));
      const button = wrapper.find("[data-test='listbox-button']");
      expect(button.attributes("disabled")).not.toBeDefined();
    });

    it("does not delete chips when the component is disabled", async () => {
      const items = [
        { value: 1, text: "Leslie Alexander" },
        { value: 2, text: "Amy Brown" },
        { value: 3, text: "Fran Nolan" },
      ];

      const wrapper = mount(
        MultiSelect,
        createConfig({ items: items, modelValue: [1, 2, 3], disabled: true })
      );

      await wrapper.vm.$nextTick();
      const chips = wrapper.findAll("[data-test='chip-close']");
      expect(chips.length).toBe(3);

      // Select the chip for Amy Brown and try to delete it
      const amyBrown = chips[1];
      await amyBrown.trigger("click");

      // None of the chips should have been deleted
      await wrapper.vm.$nextTick();
      expect(chips.length).toBe(3);
      const expectedNames = ["Leslie Alexander", "Amy Brown", "Fran Nolan"];
      const namesOnChips: string[] = wrapper
        .findAll("[data-test='chip-text']")
        .map((c) => {
          return c.text();
        });
      expect(expectedNames).toEqual(namesOnChips);
    });
  });

  it("emits an event with the selected values when a selection is made", async () => {
    const items = [
      { value: 1, text: "Leslie Alexander" },
      { value: 2, text: "Amy Brown" },
      { value: 3, text: "Fran Nolan" },
    ];

    const wrapper = mount(
      MultiSelect,
      createConfig({ items: items, modelValue: [] })
    );

    // Open the dropdown dialog
    const open = wrapper.find("[data-test='open-dialog']");
    await open.trigger("click");

    // Click the first item "Leslie Alexander"
    const optionOne = wrapper.findAll("[data-test='list-options']")[0];
    await optionOne.trigger("click");
    // Click the third item "Fran Nolan"
    const optionThree = wrapper.findAll("[data-test='list-options']")[2];
    await optionThree.trigger("click");

    const emittedValue = wrapper.emitted("update:modelValue");
    if (emittedValue) {
      expect(emittedValue).toBeTruthy();
      // When the first item is clicked the value 1 for "Leslie Alexander" is emitted with the event
      expect(emittedValue[0]).toEqual([[1]]);
      // When the third item is clicked the value 1 for "Leslie Alexander" and 3 for "Fran Nolan"
      // is emitted with the event
      expect(emittedValue[1]).toEqual([[1, 3]]);
    } else {
      fail("Expected update:modelValue event to be emitted");
    }
  });
});
