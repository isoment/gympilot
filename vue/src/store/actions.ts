import { Commit } from "vuex";
import { LOAD_STORED_STATE } from "./constants";

interface Context {
  commit: Commit;
}

const actions = {
  [LOAD_STORED_STATE](context: Context) {
    console.log(LOAD_STORED_STATE);
  },
};

export default actions;
