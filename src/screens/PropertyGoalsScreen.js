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

const PropertyGoalsScreen = ({ navigation }) => {
  // State for selected goals
  const [selectedGoals, setSelectedGoals] = useState([]);

  // Available property goals
  const propertyGoals = [
    'First Home',
    'Investment Property',
    'Upgrading Home',
    'Downsizing',
    'Retirement Planning',
    'Building Wealth'
  ];

  // Handle goal selection
  const handleGoalSelect = (goal) => {
    if (selectedGoals.includes(goal)) {
      // If already selected, remove it
      setSelectedGoals(selectedGoals.filter(item => item !== goal));
    } else {
      // If not selected, add it (limit to 3 for MVP)
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, goal]);
      }
    }
  };

  // Handle continue button press
  const handleContinue = () => {
    // Navigate to Strategy Insights screen with selected goals
    navigation.navigate('StrategyInsights', { selectedGoals });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Property Goals</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>Step 1 of 6</Text>
          <Text style={styles.preferencesText}>Define Your Goals</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '16.7%' }]} />
          </View>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.introText}>
            Select up to 3 goals that best describe what you're looking to achieve with property.
          </Text>
        </View>

        {/* Goals Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Goals</Text>
          <View style={styles.goalsContainer}>
            {propertyGoals.map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.goalChip,
                  selectedGoals.includes(goal) && styles.goalChipSelected
                ]}
                onPress={() => handleGoalSelect(goal)}
              >
                <Text 
                  style={[
                    styles.goalChipText,
                    selectedGoals.includes(goal) && styles.goalChipTextSelected
                  ]}
                >
                  {goal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            This information is educational only and not financial advice. Always consult with a licensed financial professional before making investment decisions.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.continueButton, selectedGoals.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  headerTitle: {
    fontSize: 24,
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
  introText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  goalChip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  goalChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  goalChipText: {
    fontSize: 14,
    color: '#555',
  },
  goalChipTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PropertyGoalsScreen;