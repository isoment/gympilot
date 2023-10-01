import { addHours, parseISO, compareAsc, subHours } from "date-fns";

/**
 * Convert a timestamp of the given format to Date object
 * @param timeStamp timestamp of '2023-08-20 03:34:03' format
 * @return Date
 */
export const dateTimeStampToDate = (timeStamp: string): Date => {
  const iso8601 = timeStamp.replace(" ", "T") + "Z";
  return parseISO(iso8601);
};

/**
 * Add a given amount of hours to a Date.
 */
export const plusHours = (date: Date, hours: number): Date => {
  return addHours(date, hours);
};

/**
 * Remove a given amount of hours from a Date.
 */
export const minusHours = (date: Date, hours: number): Date => {
  return subHours(date, hours);
};

/**
 * If dateOne is before dateTwo -1 is returned.
 * If the dates are the same 0 is returned.
 * If dateOne is after dateTwo 1 is returned.
 */
export const compareDate = (dateOne: Date, dateTwo: Date): number => {
  const comparisonResult = compareAsc(dateOne, dateTwo);
  return comparisonResult;
};
