export interface Country {
  name: string;
  code: string;
  capital?: string;
}

export const countries: Country[] = [
  { name: "Afghanistan", code: "AF", capital: "Kabul" },
  { name: "Albania", code: "AL", capital: "Tirana" },
  { name: "Algeria", code: "DZ", capital: "Algiers" },
  // ... Add more countries as needed
  { name: "Zimbabwe", code: "ZW", capital: "Harare" }
];