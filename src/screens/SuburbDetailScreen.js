import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropertyListings from '../components/PropertyListings';
import { searchProperties } from '../services/PropertyService';

const SuburbDetailScreen = ({ navigation, route }) => {
  // Get location data from route params
  const { location } = route.params || {};
  
  // State for property listings
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle back button press
  const handleBack = () => {
    navigation.goBack();
  };
  
  // Handle property press
  const handlePropertyPress = (property) => {
    // Open the property listing in the browser
    if (property.url) {
      Linking.openURL(property.url);
    }
  };
  
  // Fetch property listings when component mounts
  useEffect(() => {
    if (location?.name) {
      fetchProperties(location.name, location.state);
    }
  }, [location]);
  
  // Fetch property listings from realestate.com.au via MCP server
  const fetchProperties = async (suburb, state) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the PropertyService to fetch properties
      const propertyData = await searchProperties(suburb, state);
      setProperties(propertyData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{location?.name || 'Suburb Detail'}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {location ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location Overview</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>State:</Text>
                <Text style={styles.infoValue}>{location.state}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Price Range:</Text>
                <Text style={styles.infoValue}>{location.priceIndicator}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Median Price:</Text>
                <Text style={styles.infoValue}>{location.medianPrice}</Text>
              </View>
              {location.growthRate && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Growth Rate:</Text>
                  <Text style={[styles.infoValue, styles.growthValue]}>{location.growthRate}</Text>
                </View>
              )}
              {location.yieldRate && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Rental Yield:</Text>
                  <Text style={[styles.infoValue, styles.yieldValue]}>{location.yieldRate}</Text>
                </View>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Market Insights</Text>
              <Text style={styles.descriptionText}>
                {location.name} is located in {location.state} and has a median property price of {location.medianPrice}. 
                {location.growthRate ? ` The area has shown capital growth of approximately ${location.growthRate} over the past year.` : ''}
                {location.yieldRate ? ` Investors can expect rental yields of around ${location.yieldRate}.` : ''}
              </Text>
              <Text style={styles.descriptionText}>
                This information is based on historical data and should be used for educational purposes only. Market conditions can change rapidly.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Properties For Sale</Text>
              <Text style={styles.descriptionText}>
                Here are some properties currently available in {location.name}:
              </Text>
              <PropertyListings 
                properties={properties}
                loading={loading}
                error={error}
                onPropertyPress={handlePropertyPress}
              />
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Next Steps</Text>
              <Text style={styles.descriptionText}>
                To learn more about investing in {location.name}, consider speaking with a local real estate agent or mortgage broker who specializes in this area.
              </Text>
            </View>

            <View style={styles.disclaimerContainer}>
              <Text style={styles.disclaimerText}>
                This information is educational only and not financial advice. Always consult with a licensed financial professional before making investment decisions.
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Location information not available</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.continueButton}
        onPress={() => navigation.navigate('BrokerConnection')}
      >
        <Text style={styles.continueButtonText}>Continue to Next Step</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34, // Same width as back button for balanced header
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80, // Space for the continue button
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  growthValue: {
    color: '#4CAF50',
  },
  yieldValue: {
    color: '#2196F3',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 15,
  },
  disclaimerContainer: {
    backgroundColor: '#FFF9C4',
    borderRadius: 16,
    padding: 12,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 18,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuburbDetailScreen;