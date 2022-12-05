<template>
  <div class="hello">
    <div class="flex items-center justify-center mb-12">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <h1 class="text-3xl font-bold mb-4 underline">{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <div class="mt-8">
      <div v-if="result">
        <h3 class="font-bold text-xl my-2">The API says:</h3>
        <h6 class="text-green-300">{{ result.title }}</h6>
      </div>
      <div v-if="apiError">
        <h3 class="font-bold text-xl my-2">The API says:</h3>
        <h6 class="text-red-300">{{ apiErrorMessage }}</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

interface TestResult {
  title: string;
  junk: string;
}

export default defineComponent({
  name: "HelloWorld",

  props: {
    msg: {
      type: String,
      default() {
        return "Default Text";
      },
    },
  },

  setup() {
    // The result from the API
    let result = ref<TestResult>();
    let apiError = ref(false);
    let apiErrorMessage = ref("");

    // Make a call to the API test endpoint
    const callApi = async () => {
      try {
        let response = await axios.get<TestResult>(`http://localhost/api/test`);
        result.value = response.data;
        console.log(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.message) {
          apiError.value = true;
          // apiErrorMessage.value = err.response.statusText;
          apiErrorMessage.value = err.message;
          console.log(err);
          console.log(err.response);
        }
      }
    };

    // When the component is mounted load data from the API
    onMounted(() => {
      callApi();
    });

    // The properties available to the template
    return { result, apiError, apiErrorMessage };
  },
});
</script>
