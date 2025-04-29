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

const StrategyInsightsScreen = ({ navigation, route }) => {
  // Strategy archetypes data (static for MVP)
  const strategyArchetypes = [
    {
      archetypeName: "Growth Focus",
      description: "Strategies focusing on areas expected to increase in value over time. This approach prioritizes capital appreciation over immediate rental returns.",
      pros: "Potential for higher long-term returns.",
      cons: "May have lower rental yield initially.",
      associatedPriority: "Prioritise Capital Growth"
    },
    {
      archetypeName: "Yield Focus",
      description: "Strategies focusing on properties generating strong rental income relative to cost. This approach aims to maximize cash flow from day one.",
      pros: "Positive cash flow potential.",
      cons: "Capital growth might be slower in some areas.",
      associatedPriority: "Prioritise Yield"
    },
    {
      archetypeName: "Balanced Approach",
      description: "A middle-ground strategy that seeks reasonable growth with acceptable rental returns. Suitable for those who want both income and appreciation.",
      pros: "More balanced risk profile.",
      cons: "May not maximize either growth or yield specifically.",
      associatedPriority: "Balanced Investment"
    }
  ];

  // Available priorities for selection
  const availablePriorities = [
    "Prioritise Capital Growth",
    "Prioritise Yield",
    "Balanced Investment",
    "Prioritise Affordability"
  ];

  // State for selected priorities (limit to 2 for MVP)
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  // Handle priority selection
  const handlePrioritySelect = (priority) => {
    if (selectedPriorities.includes(priority)) {
      // If already selected, remove it
      setSelectedPriorities(selectedPriorities.filter(item => item !== priority));
    } else {
      // If not selected and less than 2 are selected, add it
      if (selectedPriorities.length < 2) {
        const newPriorities = [...selectedPriorities, priority];
        setSelectedPriorities(newPriorities);
        
        // If we now have at least one priority selected, enable navigation
        if (newPriorities.length > 0) {
          // Add a small delay to show the selection visually before navigating
          setTimeout(() => {
            navigation.navigate('LocationCriteria', { selectedPriorities: newPriorities });
          }, 300);
        }
      }
    }
  };

  // Handle next button press
  const handleNext = () => {
    // Navigate to Location Criteria screen with selected priorities
    navigation.navigate('LocationCriteria', { selectedPriorities });
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
          <Text style={styles.headerTitle}>Strategy Insights</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>Step 2 of 3</Text>
          <Text style={styles.preferencesText}>Explore Property Approaches</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.introText}>
            Review these common investment approaches and select up to 2 priorities that align with your goals.
          </Text>
        </View>

        {/* Strategy Archetype Cards */}
        {strategyArchetypes.map((strategy, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.strategyCard}
            onPress={() => {
              // Set the priority associated with this strategy
              setSelectedPriorities([strategy.associatedPriority]);
              // Navigate to Location Criteria screen with the selected priority
              navigation.navigate('LocationCriteria', { 
                selectedPriorities: [strategy.associatedPriority] 
              });
            }}
          >
            <Text style={styles.strategyTitle}>{strategy.archetypeName}</Text>
            <Text style={styles.strategyDescription}>{strategy.description}</Text>
            <View style={styles.prosConsContainer}>
              <Text style={styles.prosText}>Pros: {strategy.pros}</Text>
              <Text style={styles.consText}>Cons: {strategy.cons}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Priority Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Priorities (Max 2)</Text>
          <View style={styles.prioritiesContainer}>
            {availablePriorities.map((priority, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.priorityChip,
                  selectedPriorities.includes(priority) && styles.priorityChipSelected
                ]}
                onPress={() => handlePrioritySelect(priority)}
              >
                <Text 
                  style={[
                    styles.priorityChipText,
                    selectedPriorities.includes(priority) && styles.priorityChipTextSelected
                  ]}
                >
                  {priority}
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

        {/* Priority selection instructions */}
        <View style={styles.selectionInstructionContainer}>
          <Text style={styles.selectionInstructionText}>
            Tap on a strategy above to select it and continue, or use the priority selection below for a custom approach.
          </Text>
        </View>
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
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
  },
  strategyCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    // Make it look more clickable
    activeOpacity: 0.7,
  },
  strategyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  strategyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 8,
  },
  prosConsContainer: {
    marginTop: 8,
  },
  prosText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#4CAF50',
    marginBottom: 4,
  },
  consText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#F44336',
  },
  selectionInstructionContainer: {
    marginVertical: 15,
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  selectionInstructionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
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
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  priorityChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  priorityChipText: {
    fontSize: 14,
    color: '#555',
  },
  priorityChipTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    padding: 12,
    marginVertical: 15,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 18,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  nextButtonDisabled: {
    backgroundColor: '#A5D6A7',
    opacity: 0.7,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StrategyInsightsScreen;