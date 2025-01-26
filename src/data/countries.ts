import rawCountries from "./countries.json";

interface RawCountry {
  name: {
    common: string;
  };
  cca3: string;
  flags: {
    svg: string;
  };
  capital?: string[];
  region: string;
  population: number;
  latlng: number[];
  independent: boolean;
  unMember: boolean;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  capital?: string;
  region: string;
  population: number;
  latlng: [number, number];
}

// Process the raw data into a simpler format
export const countries: Country[] = (rawCountries as unknown as RawCountry[])
  .filter((country) => {
    // Include all UN members, both observer states, and fix Guinea-Bissau's status
    const shouldInclude =
      country.unMember ||
      country.name.common === "Vatican City" ||
      country.name.common === "Palestine" ||
      country.name.common === "Guinea-Bissau"; // Fix for incorrect UN member status
    return shouldInclude;
  })
  .map((country) => ({
    name: country.name.common,
    code: country.cca3,
    flag: country.flags.svg,
    capital: country.capital?.[0],
    region: country.region,
    population: country.population,
    latlng: [country.latlng[0], country.latlng[1]] as [number, number],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Export some useful derived data
export const regions = [
  ...new Set(countries.map((country) => country.region)),
].sort();

export const countryCount = countries.length;

export const totalPopulation = countries.reduce(
  (sum, country) => sum + country.population,
  0
);

// Helper function to get a random country
export function getRandomCountry(): Country {
  const index = Math.floor(Math.random() * countries.length);
  return countries[index];
}

// Helper function to search countries
export function searchCountries(query: string): Country[] {
  const searchTerm = query.toLowerCase();
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm) ||
      country.capital?.toLowerCase().includes(searchTerm) ||
      country.region.toLowerCase().includes(searchTerm)
  );
}
