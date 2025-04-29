# Supabase Integration and Financial Input Setup

## Overview

This document outlines the implementation of Supabase database integration for location data and the addition of financial input functionality to the Bricklogic property investment app.

## Supabase Setup

### 1. Database Configuration

To set up Supabase for this application:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to the SQL Editor and create a `locations` table with the following structure:

```sql
CREATE TABLE suburb_analytics (
  suburb_id SERIAL PRIMARY KEY,
  suburb_name VARCHAR(100) NOT NULL,
  postcode VARCHAR(4) NOT NULL,
  state VARCHAR(3) NOT NULL,
  lga_name VARCHAR(100),
  median_sale_price_house_12m DECIMAL(12, 2),
  median_sale_price_unit_12m DECIMAL(12, 2),
  annual_growth_house_12m DECIMAL(5, 2),
  annual_growth_unit_12m DECIMAL(5, 2),
  gross_rental_yield_house DECIMAL(4, 2),
  gross_rental_yield_unit DECIMAL(4, 2),
  vacancy_rate_pct DECIMAL(4, 2),
  population_growth_annual DECIMAL(4, 2),
  price_indicator_category VARCHAR(10),
  data_as_of_date DATE DEFAULT CURRENT_DATE
);
```

4. Insert sample location data:

```sql
INSERT INTO suburbs (suburb_name, postcode, state, lga_name, median_sale_price_house_12m, median_sale_price_unit_12m, annual_growth_house_12m, annual_growth_unit_12m, gross_rental_yield_house, gross_rental_yield_unit, vacancy_rate_pct, population_growth_annual, price_indicator_category)
VALUES
  ('Parramatta', '2150', 'NSW', 'Parramatta', 950000, 650000, 5.2, 4.1, 3.8, 4.2, 2.1, 1.8, 'HIGH'),
  ('Blacktown', '2148', 'NSW', 'Blacktown', 780000, 520000, 4.8, 3.9, 4.0, 4.5, 1.8, 1.5, 'MEDIUM'),
  ('Liverpool', '2170', 'NSW', 'Liverpool', 820000, 550000, 4.5, 3.7, 4.1, 4.6, 2.0, 1.7, 'MEDIUM'),
  ('Logan', '4114', 'QLD', 'Logan', 480000, 380000, 3.5, 2.8, 5.8, 6.2, 1.5, 2.0, 'LOW'),
  ('Ipswich', '4305', 'QLD', 'Ipswich', 450000, 350000, 3.2, 2.5, 5.6, 6.0, 1.6, 2.2, 'LOW'),
  ('Wollongong', '2500', 'NSW', 'Wollongong', 850000, 620000, 4.0, 3.2, 4.2, 4.7, 1.9, 1.4, 'HIGH'),
  ('Newcastle', '2300', 'NSW', 'Newcastle', 820000, 580000, 3.8, 3.0, 4.3, 4.8, 1.7, 1.3, 'MEDIUM'),
  ('Tamworth', '2340', 'NSW', 'Tamworth', 380000, 290000, 2.5, 1.8, 5.0, 5.5, 1.4, 0.9, 'LOW');
```

### 2. API Keys

In the `src/services/SupabaseService.js` file, replace the placeholder values with your actual Supabase URL and anon key:

```javascript
const supabaseUrl = "YOUR_SUPABASE_URL"; // Replace with your Supabase URL
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"; // Replace with your Supabase anon key
```

You can find these values in your Supabase project settings under API.

## Implementation Details

### Added Files

1. **SupabaseService.js**: Handles database connections and queries for suburb analytics data
2. **FinancialService.js**: Provides functions for financial calculations and validation

### Modified Files

1. **PropertyService.js**: Updated to use Supabase for suburb analytics data retrieval
2. **LocationResultsScreen.js**: Modified to fetch and display suburb analytics data including postcode, vacancy rates, and population growth
3. **SupabaseService.js**: Updated to work with the new suburb_analytics schema and added property type filtering
4. **InvestmentProfileScreen.js**: Added financial input fields and integration with FinancialService
5. **package.json**: Added Supabase client dependency

### Suburb Analytics Feature

The suburb analytics feature provides users with detailed information about potential investment locations:

- Suburb name, state, and postcode
- Median sale prices for houses and units
- Annual growth rates for houses and units
- Rental yield rates for houses and units
- Vacancy rates and population growth (for future filtering)

The app displays this information in an educational context with clear disclaimers that this is not financial advice.

### Financial Input Feature

The financial input feature allows users to enter:

- Annual income
- Monthly expenses
- Existing liabilities

The app provides an educational estimate of borrowing capacity based on this information, with clear disclaimers that this is not financial advice.

## Important Notes

1. **Educational Purpose Only**: All financial calculations are simplified and for educational purposes only. The app includes disclaimers to make this clear to users.

2. **Data Privacy**: Financial information is only used locally and is not stored persistently in the current implementation.

3. **Fallback to Mock Data**: If Supabase connection fails, the app will display an error message but continue to function.

## Next Steps

1. Implement proper error handling for Supabase connection issues
2. Add more sophisticated financial calculations with additional parameters
3. Implement filtering by additional metrics like vacancy rate and population growth
