/**
 * FinancialService.js
 * Service for handling financial calculations and data
 * This service provides educational estimates only, NOT financial advice
 */

import { calculateAffordability } from './SupabaseService';

/**
 * Calculate estimated borrowing capacity based on user's financial information
 * @param {object} financialInfo - User's financial information
 * @param {number} financialInfo.income - Annual income
 * @param {number} financialInfo.expenses - Monthly expenses
 * @param {number} financialInfo.liabilities - Existing liabilities
 * @returns {object} - Affordability information with disclaimer
 */
export const estimateBorrowingCapacity = (financialInfo) => {
  try {
    // Use the calculation function from SupabaseService
    return calculateAffordability(financialInfo);
  } catch (error) {
    console.error('Error calculating borrowing capacity:', error);
    return {
      estimatedBorrowingCapacity: 0,
      debtToIncomeRatio: '0.00',
      disclaimer: 'Unable to calculate estimate. This tool provides educational information only, not financial advice. Please consult a mortgage broker for accurate assessment.'
    };
  }
};

/**
 * Format currency value for display
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value) => {
  if (!value) return '$0';
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Parse currency input to number
 * @param {string} value - The currency string to parse
 * @returns {number} - Parsed number value
 */
export const parseCurrency = (value) => {
  if (!value) return 0;
  // Remove currency symbol and commas
  const numericValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(numericValue) || 0;
};

/**
 * Validate financial input
 * @param {object} financialInfo - User's financial information
 * @returns {object} - Validation result with any errors
 */
export const validateFinancialInput = (financialInfo) => {
  const { income, expenses, liabilities } = financialInfo;
  const errors = {};
  
  if (!income || income <= 0) {
    errors.income = 'Please enter a valid income amount';
  }
  
  if (!expenses || expenses < 0) {
    errors.expenses = 'Please enter a valid expense amount';
  }
  
  if (!liabilities || liabilities < 0) {
    errors.liabilities = 'Please enter a valid liabilities amount';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};