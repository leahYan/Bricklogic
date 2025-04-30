import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchLocations } from '../services/SupabaseService';

const LocationResultsScreen = ({ navigation, route }) => {
  // Get criteria from previous screen
  const { selectedPriorities, state, budget } = route.params || { 
    selectedPriorities: [], 
    state: 'NSW', 
    budget: 700000 
  };

  // State for loading and results
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  // Fetch locations from Supabase
  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Calculate budget range (±20% of the budget for MVP)
        const minBudget = Math.max(100000, budget * 0.8);
        const maxBudget = budget * 1.2;
        
        // Get the priority (use the first one if multiple are selected)
        const priority = selectedPriorities.length > 0 ? selectedPriorities[0] : 'Balanced Investment';
        
        // Default to 'house' property type for MVP (can be expanded later)
        const propertyType = 'house';
        
        // Fetch locations from Supabase with property type
        const locationData = await fetchLocations(state, minBudget, maxBudget, priority, propertyType);
        
        setLocations(locationData);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to fetch locations. Please try again.');
        
        // Fallback to empty array if there's an error
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };
    
    getLocations();
  }, [selectedPriorities, state, budget]);

  // Handle location item press
  const handleLocationPress = (location) => {
    // Navigate to SuburbDetail screen with location data
    // This will trigger property search for the selected location
    navigation.navigate('SuburbDetail', { location });
  };

  // Handle continue button press
  const handleContinue = () => {
    navigation.navigate('BrokerConnection');
  };

  // Render location item
  const renderLocationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.locationItem}
      onPress={() => handleLocationPress(item)}
    >
      <View style={styles.locationHeader}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationPrice}>
          {item.priceIndicator === 'LOW' ? '$' : item.priceIndicator === 'MEDIUM' ? '$$' : '$$$'}
        </Text>
      </View>
      <View style={styles.viewPropertiesContainer}>
        <Ionicons name="home-outline" size={16} color="#4CAF50" />
        <Text style={styles.viewPropertiesText}>View Properties</Text>
      </View>
      <Text style={styles.locationState}>{item.state}, {item.postcode}</Text>
      <Text style={styles.locationMedianPrice}>Median: {item.medianPrice}</Text>
      {item.growthRate && (
        <Text style={styles.locationGrowth}>Growth: {item.growthRate}</Text>
      )}
      {item.yieldRate && (
        <Text style={styles.locationYield}>Yield: {item.yieldRate}</Text>
      )}
      {item.vacancyRate && (
        <Text style={styles.locationMetric}>Vacancy: {item.vacancyRate}</Text>
      )}
      {item.populationGrowth && (
        <Text style={styles.locationMetric}>Population Growth: {item.populationGrowth}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Results</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>
          {selectedPriorities.length > 0 
            ? `Locations matching ${selectedPriorities[0]} in ${state}`
            : `Locations in ${state}`}
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Finding locations...</Text>
        </View>
      ) : locations.length > 0 ? (
        <>
          <FlatList
            data={locations}
            renderItem={renderLocationItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue to Next Step</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={60} color="#BDBDBD" />
          <Text style={styles.noResultsText}>No locations found matching your criteria</Text>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue to Next Step</Text>
          </TouchableOpacity>
        </View>
      )}
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
  infoButton: {
    padding: 5,
  },
  criteriaContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  criteriaText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 80, // Extra padding for the continue button
  },
  locationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  locationPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  viewPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewPropertiesText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 5,
    fontWeight: '500',
  },
  locationState: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  locationMedianPrice: {
    fontSize: 14,
    color: '#333',
  },
  locationGrowth: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 3,
  },
  locationYield: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 3,
  },
  locationMetric: {
    fontSize: 14,
    color: '#616161',
    marginTop: 3,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
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

export default LocationResultsScreen;