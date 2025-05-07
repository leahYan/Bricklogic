// Type definitions for Bricklogic app

// Location/Suburb types
export interface Location {
  name: string;
  state: string;
  postcode: string;
  priceIndicator: 'LOW' | 'MEDIUM' | 'HIGH';
  growthRate: string | null;
  yieldRate: string | null;
  medianPrice: string;
  vacancyRate: string | null;
  populationGrowth: string | null;
  dataAsOfDate?: string;
}

// Investment priority types
export type InvestmentPriority = 
  | 'Passive Income'
  | 'Capital Growth'
  | 'Personal Use'
  | 'Property Ladder';

// Property types
export type PropertyType = 'house' | 'unit';

// Navigation params types
export interface LocationCriteriaParams {
  selectedPriorities: InvestmentPriority[];
}

export interface LocationResultsParams extends LocationCriteriaParams {
  state: string;
  budget: number;
}

export interface SuburbDetailParams {
  location: Location;
}

// Supabase service types
export interface SuburbAnalytics {
  suburb_name: string;
  state: string;
  postcode: string;
  price_indicator_category?: string;
  median_sale_price_house_12m: number;
  median_sale_price_unit_12m?: number;
  annual_growth_house_12m?: number;
  annual_growth_unit_12m?: number;
  gross_rental_yield_house?: number;
  gross_rental_yield_unit?: number;
  vacancy_rate_pct?: number;
  population_growth_annual?: number;
  data_as_of_date?: string;
}