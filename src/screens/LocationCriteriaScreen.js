import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BudgetSlider from '../components/BudgetSlider';

const LocationCriteriaScreen = ({ navigation, route }) => {
  // Get selected priorities from previous screen
  const { selectedPriorities } = route.params || { selectedPriorities: [] };

  // State for location criteria
  const [state, setState] = useState('NSW'); // Default state
  const [budget, setBudget] = useState(700000); // Default budget

  // Available states in Australia
  const australianStates = [
    'NSW',
    'VIC',
    'QLD',
    'WA',
    'SA',
    'TAS',
    'ACT',
    'NT'
  ];

  // Handle state selection
  const handleStateSelect = (selectedState) => {
    setState(selectedState);
  };

  // Handle find locations button press
  const handleFindLocations = () => {
    // Navigate to Location Results screen with criteria
    navigation.navigate('LocationResults', {
      selectedPriorities,
      state,
      budget
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Location Criteria</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>Step 3 of 3</Text>
          <Text style={styles.preferencesText}>Find Matching Locations</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>

        {/* Selected Priorities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Selected Priorities</Text>
          <View style={styles.prioritiesContainer}>
            {selectedPriorities.map((priority, index) => (
              <View key={index} style={styles.priorityChip}>
                <Text style={styles.priorityChipText}>{priority}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* State Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select State</Text>
          <View style={styles.statesContainer}>
            {australianStates.map((stateOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.stateChip,
                  state === stateOption && styles.stateChipSelected
                ]}
                onPress={() => handleStateSelect(stateOption)}
              >
                <Text 
                  style={[
                    styles.stateChipText,
                    state === stateOption && styles.stateChipTextSelected
                  ]}
                >
                  {stateOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Range</Text>
          <BudgetSlider 
            minValue={500000}
            maxValue={1400000}
            initialValue={budget}
            onValueChange={setBudget}
          />
        </View>

        {/* Find Locations Button */}
        <TouchableOpacity 
          style={styles.findButton}
          onPress={handleFindLocations}
        >
          <Text style={styles.findButtonText}>Find Locations</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  progressContainer: {
    marginBottom: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
  },
  preferencesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginTop: 10,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  prioritiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  priorityChip: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  priorityChipText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  stateChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  stateChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  stateChipText: {
    fontSize: 14,
    color: '#555',
  },
  stateChipTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  findButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  findButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationCriteriaScreen;