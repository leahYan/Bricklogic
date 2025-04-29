/**
 * LocationService.js
 * Service for handling location data and user location interactions
 */

import supabase from './SupabaseService';

/**
 * Fetch strategy archetypes for display
 * @returns {Promise} - Promise resolving to strategy archetype data
 */
export const fetchStrategyArchetypes = async () => {
  try {
    const { data, error } = await supabase
      .from('strategy_archetypes')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;

    return data.map(archetype => ({
      name: archetype.archetype_name,
      description: archetype.description,
      prosCons: archetype.pros_cons,
      associatedPriority: archetype.associated_priority,
    }));
  } catch (error) {
    console.error('Error fetching strategy archetypes:', error);
    throw new Error('Failed to load strategy information. Please try again.');
  }
};

/**
 * Search suburbs based on user criteria
 * @param {object} criteria - Search criteria
 * @returns {Promise} - Promise resolving to matching suburbs
 */
export const searchSuburbs = async (criteria) => {
  try {
    const { state, budgetRange, priority } = criteria;
    
    // Map priority to relevant columns
    let orderColumn = 'median_sale_price_house_12m';
    if (priority === 'growth') {
      orderColumn = 'annual_growth_house_12m';
    } else if (priority === 'yield') {
      orderColumn = 'gross_rental_yield_house';
    }

    const { data, error } = await supabase
      .from('suburb_analytics')
      .select('*')
      .eq('state', state)
      .gte('price_indicator_category', budgetRange.min)
      .lte('price_indicator_category', budgetRange.max)
      .order(orderColumn, { ascending: false })
      .limit(10); // Limit results for MVP

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error searching suburbs:', error);
    throw new Error('Failed to search locations. Please try again.');
  }
};

/**
 * Track suburb views for a user visit
 * @param {string} visitId - Visit ID
 * @param {Array} suburbIds - Array of suburb IDs viewed
 */
export const trackSuburbViews = async (visitId, suburbIds) => {
  try {
    const viewRecords = suburbIds.map(suburbId => ({
      visit_id: visitId,
      suburb_id: suburbId,
      view_timestamp: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('user_suburb_views')
      .insert(viewRecords);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking suburb views:', error);
    // Don't throw to prevent disrupting the user experience
  }
};

/**
 * Get suburb details by ID
 * @param {string} suburbId - Suburb ID
 * @returns {Promise} - Promise resolving to suburb details
 */
export const getSuburbDetails = async (suburbId) => {
  try {
    const { data, error } = await supabase
      .from('suburb_analytics')
      .select('*')
      .eq('suburb_id', suburbId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching suburb details:', error);
    throw new Error('Failed to load suburb details. Please try again.');
  }
};