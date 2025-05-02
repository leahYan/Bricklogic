import { createClient } from '@supabase/supabase-js';
import { Location, SuburbAnalytics } from '../types';

// Initialize Supabase client
// Note: In a production environment, these values should be stored in environment variables
const supabaseUrl = 'https://wsafgqgbgezzxpsqrodu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWZncWdiZ2V6enhwc3Fyb2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDQwNzAsImV4cCI6MjA2MTQyMDA3MH0.m_Qla9q0ZtjirnAPkyGyB2_v_Y8QLWWvxF0KHVM7vz8';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch suburb analytics based on search criteria
 * @param state - The state code (e.g., NSW, VIC)
 * @param minBudget - Minimum budget
 * @param maxBudget - Maximum budget
 * @param priority - Investment priority
 * @param propertyType - Property type ('house' or 'unit')
 * @returns Promise resolving to location data
 */
export const fetchLocations = async (
  state: string,
  minBudget: number,
  maxBudget: number,
  priority: string,
  propertyType: 'house' | 'unit' = 'house'
): Promise<Location[]> => {
  try {
    // Determine which price and metrics columns to use based on property type
    const priceColumn = propertyType === 'unit' ? 'median_sale_price_unit_12m' : 'median_sale_price_house_12m';
    const growthColumn = propertyType === 'unit' ? 'annual_growth_unit_12m' : 'annual_growth_house_12m';
    const yieldColumn = propertyType === 'unit' ? 'gross_rental_yield_unit' : 'gross_rental_yield_house';
    
    // Convert priority to database column for filtering
    let orderColumn = priceColumn;
    if (priority === 'Prioritise Capital Growth') {
      orderColumn = growthColumn;
    } else if (priority === 'Prioritise Yield') {
      orderColumn = yieldColumn;
    } else if (priority === 'Balanced Investment') {
      // For balanced, we'll use a combination approach in the future
      // For MVP, we'll just order by median price
      orderColumn = priceColumn;
    }

    // Query the suburb_analytics table with filters
    const { data, error } = await supabase
      .from('suburb_analytics')
      .select('*')
      .eq('state', state)
      .gte(priceColumn, minBudget)
      .lte(priceColumn, maxBudget)
      .order(orderColumn, { ascending: priority === 'Prioritise Affordability' });

    if (error) throw error;
    
    // Transform data to match the expected format in the app
    return (data as SuburbAnalytics[]).map(suburb => ({
      name: suburb.suburb_name,
      state: suburb.state,
      postcode: suburb.postcode,
      priceIndicator: suburb.price_indicator_category as 'LOW' | 'MEDIUM' | 'HIGH' || getPriceIndicator(suburb[priceColumn as keyof SuburbAnalytics] as number),
      growthRate: suburb[growthColumn as keyof SuburbAnalytics] ? `${suburb[growthColumn as keyof SuburbAnalytics]}%` : null,
      yieldRate: suburb[yieldColumn as keyof SuburbAnalytics] ? `${suburb[yieldColumn as keyof SuburbAnalytics]}%` : null,
      medianPrice: formatPrice(suburb[priceColumn as keyof SuburbAnalytics] as number),
      vacancyRate: suburb.vacancy_rate_pct ? `${suburb.vacancy_rate_pct}%` : null,
      populationGrowth: suburb.population_growth_annual ? `${suburb.population_growth_annual}%` : null,
      dataAsOfDate: suburb.data_as_of_date,
    }));
  } catch (error) {
    console.error('Error fetching suburb analytics from Supabase:', error);
    throw new Error('Failed to fetch location data. Please try again later.');
  }
};

/**
 * Get price indicator based on price value
 * @param price - The price value
 * @returns Price indicator category (LOW, MEDIUM, or HIGH)
 */
const getPriceIndicator = (price: number): 'LOW' | 'MEDIUM' | 'HIGH' => {
  if (price < 500000) return 'LOW';
  if (price < 800000) return 'MEDIUM';
  return 'HIGH';
};

/**
 * Format price as currency string
 * @param price - The price value
 * @returns Formatted price string
 */
const formatPrice = (price: number): string => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};