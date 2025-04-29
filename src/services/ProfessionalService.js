/**
 * ProfessionalService.js
 * Service for handling professional (broker) interactions and lead management
 */

import supabase from './SupabaseService';

/**
 * Fetch available mortgage brokers
 * @param {string} state - State to filter brokers by
 * @returns {Promise} - Promise resolving to broker data
 */
export const fetchMortgageBrokers = async (state) => {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('professional_type', 'Mortgage Broker')
      .contains('service_states', [state]);

    if (error) throw error;

    return data.map(broker => ({
      id: broker.professional_id,
      businessName: broker.business_name,
      phone: broker.phone,
      email: broker.email,
      website: broker.website,
      serviceStates: broker.service_states,
    }));
  } catch (error) {
    console.error('Error fetching mortgage brokers:', error);
    throw new Error('Failed to load broker information. Please try again.');
  }
};

/**
 * Track professional interaction
 * @param {string} visitId - Visit ID
 * @param {object} interactionData - Interaction details
 */
export const trackProfessionalInteraction = async (visitId, interactionData) => {
  try {
    const { error } = await supabase
      .from('user_professional_interactions')
      .insert([{
        visit_id: visitId,
        professional_type_offered: 'Mortgage Broker',
        interaction_type: interactionData.type,
        professional_id_shown: interactionData.brokerId,
        lead_form_data: interactionData.formData,
        interaction_timestamp: new Date().toISOString(),
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking professional interaction:', error);
    // Don't throw to prevent disrupting the user experience
  }
};

/**
 * Submit lead form data
 * @param {string} visitId - Visit ID
 * @param {object} formData - Lead form data
 * @param {string} brokerId - Selected broker ID
 * @returns {Promise} - Promise resolving to submission status
 */
export const submitLeadForm = async (visitId, formData, brokerId) => {
  try {
    // Track the form submission interaction
    await trackProfessionalInteraction(visitId, {
      type: 'Lead Form Submitted',
      brokerId,
      formData: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preferredContact: formData.preferredContact,
        bestTimeToContact: formData.bestTimeToContact,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead form:', error);
    throw new Error('Failed to submit form. Please try again.');
  }
};

/**
 * Track broker prompt display
 * @param {string} visitId - Visit ID
 * @param {string} brokerId - Broker ID shown
 */
export const trackBrokerPromptDisplay = async (visitId, brokerId) => {
  await trackProfessionalInteraction(visitId, {
    type: 'Prompt Displayed',
    brokerId,
  });
};

/**
 * Track broker connection click
 * @param {string} visitId - Visit ID
 * @param {string} brokerId - Broker ID clicked
 */
export const trackBrokerConnectionClick = async (visitId, brokerId) => {
  await trackProfessionalInteraction(visitId, {
    type: 'Connection Clicked',
    brokerId,
  });
};

/**
 * Track 'Maybe Later' click on broker prompt
 * @param {string} visitId - Visit ID
 */
export const trackBrokerMaybeLater = async (visitId) => {
  await trackProfessionalInteraction(visitId, {
    type: 'Maybe Later Clicked',
  });
};