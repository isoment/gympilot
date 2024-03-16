<template>
  <div
    v-if="renderError()"
    class="my-1 text-xs text-rose-500 font-base"
    data-test="error-display"
  >
    {{ renderError() }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ValidationErrors",

  /**
   *  The errors prop contains the validation errors. The key is the form field and
   *  the value is the error. The field prop controls which error to display.
   */
  props: {
    errors: {
      type: Object as PropType<{ [key: string]: string }>,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    /**
     *  We check if the field prop is contained in the errors object, if it is we
     *  return the first validation error for that field.
     */
    const renderError = (): string | void => {
      if (Object.prototype.hasOwnProperty.call(props.errors, props.field)) {
        const validationFieldArray = props.errors[props.field as keyof {}];
        return validationFieldArray;
      }
    };

    return { renderError };
  },
});
</script>
