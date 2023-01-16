import state from "@/store/state";
import { GlobalState } from "@/store/types";

/**
 *  A factory to create the state for tests. We can override properties on the
 *  state by passing in a config object.
 *  @param {Partial<GlobalState>} config
 */
export const createState = (config: Partial<GlobalState> = {}): GlobalState => {
  const initialState = state();
  return { ...initialState, ...config };
};
