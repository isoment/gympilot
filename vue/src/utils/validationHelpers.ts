import { timeZonesNames } from "@vvo/tzdb";
import { availableCountries } from "@/config/options";

const validStringInput = (
  input: string = "",
  min: number = 1,
  max: number = 255
): boolean => {
  if (input.length >= min && input.length <= max) {
    return true;
  }
  return false;
};

const validCountry = (country: string): boolean => {
  if (country.length === 0) return false;
  for (const item of availableCountries) {
    if (item.code === country) {
      return true;
    }
  }
  return false;
};

const validTimezone = (timezone: string): boolean => {
  if (timezone.length === 0) return false;
  const timezones = timeZonesNames;
  return timezones.includes(timezone) ? true : false;
};

const validBooleanInt = (value: unknown): boolean => {
  if (value === 0 || value === 1) return true;
  return false;
};

export { validBooleanInt, validStringInput, validCountry, validTimezone };
