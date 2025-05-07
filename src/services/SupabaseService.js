/**
 * SupabaseService.js
 * Service for handling Supabase database connections and queries
 * This service provides functions to interact with the Supabase database for location data
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Supabase client
// Note: In a production environment, these values should be stored in environment variables
const supabaseUrl = 'https://wsafgqgbgezzxpsqrodu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzYWZncWdiZ2V6enhwc3Fyb2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDQwNzAsImV4cCI6MjA2MTQyMDA3MH0.m_Qla9q0ZtjirnAPkyGyB2_v_Y8QLWWvxF0KHVM7vz8';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Fetch suburb analytics based on search criteria
 * @param {string} state - The state code (e.g., NSW, VIC)
 * @param {number} minBudget - Minimum budget
 * @param {number} maxBudget - Maximum budget
 * @param {string} priority - Investment priority (e.g., 'growth', 'yield', 'balanced', 'affordability')
 * @param {string} propertyType - Property type ('house' or 'unit')
 * @returns {Promise} - Promise resolving to suburb analytics data
 */
export const fetchLocations = async (state, minBudget, maxBudget, priority, propertyType = 'house') => {
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
      .order(orderColumn, { ascending: false }); // Default to descending order (higher values first)

    if (error) throw error;
    
    // Transform data to match the expected format in the app
    return data.map(suburb => ({
      name: suburb.suburb_name,
      state: suburb.state,
      postcode: suburb.postcode,
      priceIndicator: suburb.price_indicator_category || getPriceIndicator(suburb[priceColumn]),
      growthRate: suburb[growthColumn] ? `${suburb[growthColumn]}%` : null,
      yieldRate: suburb[yieldColumn] ? `${suburb[yieldColumn]}%` : null,
      medianPrice: formatPrice(suburb[priceColumn]),
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
 * @param {number} price - The price value
 * @returns {string} - Price indicator category (LOW, MEDIUM, or HIGH)
 */
const getPriceIndicator = (price) => {
  if (price < 500000) return 'LOW';
  if (price < 800000) return 'MEDIUM';
  return 'HIGH';
};

/**
 * Format price as currency string
 * @param {number} price - The price value
 * @returns {string} - Formatted price string
 */
const formatPrice = (price) => {
  return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Calculate affordability based on user's financial information
 * @param {object} financialInfo - User's financial information
 * @param {number} financialInfo.income - Annual income
 * @param {number} financialInfo.expenses - Monthly expenses
 * @param {number} financialInfo.liabilities - Existing liabilities
 * @returns {object} - Affordability information
 */
export const calculateAffordability = (financialInfo) => {
  const { income, expenses, liabilities } = financialInfo;
  
  // This is a simplified calculation for MVP purposes
  // In a real app, this would be more complex and would involve proper financial calculations
  // Note: This is NOT financial advice, just a rough estimate for educational purposes
  
  // Monthly income
  const monthlyIncome = income / 12;
  
  // Disposable income (monthly income - expenses)
  const disposableIncome = monthlyIncome - expenses;
  
  // Simplified debt-to-income ratio
  const debtToIncomeRatio = liabilities / income;
  
  // Rough borrowing capacity (very simplified)
  // Assumes 30% of disposable income can go to mortgage payments
  // and a 30-year loan at 5% interest
  const monthlyPaymentCapacity = disposableIncome * 0.3;
  const estimatedBorrowingCapacity = monthlyPaymentCapacity * 180; // Simplified calculation
  
  // Adjust for existing liabilities
  const adjustedBorrowingCapacity = estimatedBorrowingCapacity * (1 - debtToIncomeRatio);
  
  return {
    estimatedBorrowingCapacity: Math.round(adjustedBorrowingCapacity),
    debtToIncomeRatio: debtToIncomeRatio.toFixed(2),
    // Include disclaimer to emphasize this is not financial advice
    disclaimer: 'This is a rough estimate for educational purposes only and NOT financial advice. Speak to a mortgage broker for accurate borrowing capacity.'
  };
};

export default supabase;