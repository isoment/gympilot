import { addHours } from "date-fns";

/**
 *  Add a given amount of hours to a Date.
 */
export const plusHours = (date: Date, hours: number): Date => {
  return addHours(date, hours);
};
