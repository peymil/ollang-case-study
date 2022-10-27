export type UniversitySearchItem = {
  domains: string[];
  country: string;
  'state-province': string;
  web_pages: string[];
  name: string;
  alpha_two_code: string;
};

export type UniversitySearchResponse = UniversitySearchItem[];
