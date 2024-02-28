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

export { validStringInput, validCountry, validTimezone };
