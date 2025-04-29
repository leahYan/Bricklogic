/**
 * UserService.js
 * Service for handling user authentication, profile management and session tracking
 */

import supabase from './SupabaseService';

/**
 * Sign up a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolving to the new user data
 */
export const signUp = async (email, password) => {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Create initial user profile
    await createUserProfile(user.id);

    return user;
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error('Failed to create account. Please try again.');
  }
};

/**
 * Sign in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolving to the user data
 */
export const signIn = async (email, password) => {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login timestamp
    await updateLastLogin(user.id);

    // Start tracking user visit
    await createUserVisit(user.id);

    return user;
  } catch (error) {
    console.error('Error during signin:', error);
    throw new Error('Failed to sign in. Please check your credentials.');
  }
};

/**
 * Create initial user profile
 * @param {string} userId - User's ID
 */
const createUserProfile = async (userId) => {
  try {
    const { error } = await supabase
      .from('users')
      .insert([{
        user_id: userId,
        account_status: 'active',
        created_at: new Date().toISOString(),
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating user profile:', error);
    // Don't throw here to prevent blocking signup
  }
};

/**
 * Update user's last login timestamp
 * @param {string} userId - User's ID
 */
const updateLastLogin = async (userId) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

/**
 * Update user's basic profile
 * @param {string} userId - User's ID
 * @param {object} profileData - Profile data to update
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        goal_category: profileData.goalCategory,
        budget_range: profileData.budgetRange,
        preferred_state: profileData.preferredState,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update profile. Please try again.');
  }
};

/**
 * Create a new user visit record
 * @param {string} userId - User's ID
 * @returns {Promise} - Promise resolving to the visit ID
 */
export const createUserVisit = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_visits')
      .insert([{
        user_id: userId,
        visit_start_timestamp: new Date().toISOString(),
        app_version_during_visit: process.env.REACT_APP_VERSION || '1.0.0',
        device_os_during_visit: getDeviceOS(),
      }])
      .select();

    if (error) throw error;
    return data[0].visit_id;
  } catch (error) {
    console.error('Error creating user visit:', error);
    throw new Error('Failed to track session. Please try again.');
  }
};

/**
 * Update user visit with search criteria
 * @param {string} visitId - Visit ID
 * @param {object} searchCriteria - Search criteria data
 */
export const updateUserVisitWithSearch = async (visitId, searchCriteria) => {
  try {
    const { error } = await supabase
      .from('user_visits')
      .update({
        priority_selected_during_visit: searchCriteria.priority,
        state_searched_during_visit: searchCriteria.state,
        budget_range_searched_during_visit: searchCriteria.budgetRange,
      })
      .eq('visit_id', visitId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating visit with search:', error);
  }
};

/**
 * Update user visit end timestamp
 * @param {string} visitId - Visit ID
 */
export const endUserVisit = async (visitId) => {
  try {
    const { error } = await supabase
      .from('user_visits')
      .update({ visit_end_timestamp: new Date().toISOString() })
      .eq('visit_id', visitId);

    if (error) throw error;
  } catch (error) {
    console.error('Error ending user visit:', error);
  }
};

/**
 * Get device OS information
 * @returns {string} - Device OS name
 */
const getDeviceOS = () => {
  const userAgent = window.navigator.userAgent;
  if (/android/i.test(userAgent)) return 'Android';
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'iOS';
  return 'Unknown';
};