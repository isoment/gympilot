<template>
  <div v-if="errorFor()" class="my-1 text-xs italic text-red-400">
    {{ errorFor() }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ValidationErrors",

  props: {
    // We pass in an object with the validation errors the api returns, each
    // key in the object represents the validation field and the value is an
    // array of all the validation errors.
    errors: {
      type: Object as PropType<{}>,
      required: true,
    },
    // We want to see if a given field has a validation error in the api response.
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
    const errorFor = (): string | void => {
      if (Object.prototype.hasOwnProperty.call(props.errors, props.field)) {
        const validationFieldArray = props.errors[props.field as keyof {}];
        return validationFieldArray[0];
      }
    };

    return { errorFor };
  },
});
</script>
