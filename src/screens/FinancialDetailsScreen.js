import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CurrencyInput from '../components/CurrencyInput';
import { estimateBorrowingCapacity, parseCurrency, validateFinancialInput } from '../services/FinancialService';

const FinancialDetailsScreen = ({ navigation, route }) => {
  // Get data from previous screen
  const { budget, cashAvailable, location, investmentGoal } = route.params || {};

  // Financial information state
  const [annualIncome, setAnnualIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [existingLiabilities, setExistingLiabilities] = useState('');
  const [borrowingCapacity, setBorrowingCapacity] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  // Calculate borrowing capacity based on financial inputs
  const calculateBorrowingCapacity = () => {
    // Parse currency inputs to numbers
    const financialInfo = {
      income: parseCurrency(annualIncome),
      expenses: parseCurrency(monthlyExpenses),
      liabilities: parseCurrency(existingLiabilities)
    };
    
    // Validate inputs
    const validation = validateFinancialInput(financialInfo);
    
    if (!validation.isValid) {
      setInputErrors(validation.errors);
      return;
    }
    
    // Clear any previous errors
    setInputErrors({});
    
    // Calculate borrowing capacity
    const result = estimateBorrowingCapacity(financialInfo);
    setBorrowingCapacity(result);
    
    // Show educational disclaimer
    Alert.alert(
      'Educational Estimate Only',
      result.disclaimer,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  // Handle continue button press
  const handleContinue = () => {
    // Navigate to the next screen (Location Criteria)
    navigation.navigate('LocationCriteria', { 
      budget, 
      cashAvailable, 
      location, 
      investmentGoal,
      financialInfo: {
        annualIncome: parseCurrency(annualIncome),
        monthlyExpenses: parseCurrency(monthlyExpenses),
        existingLiabilities: parseCurrency(existingLiabilities),
        estimatedBorrowingCapacity: borrowingCapacity?.estimatedBorrowingCapacity || 0
      }
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
          <Text style={styles.headerTitle}>Financial Details</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>Step 4 of 6</Text>
          <Text style={styles.preferencesText}>Financial Information</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66.7%' }]} />
          </View>
        </View>

        {/* Financial Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Information</Text>
          <Text style={styles.sectionDescription}>
            This information is used for educational purposes only and helps provide context for property recommendations.
          </Text>
          
          {/* Annual Income */}
          <Text style={styles.inputLabel}>Annual Income</Text>
          <CurrencyInput
            value={annualIncome}
            onChangeText={setAnnualIncome}
            placeholder="$0"
          />
          {inputErrors.income && <Text style={styles.errorText}>{inputErrors.income}</Text>}
          
          {/* Monthly Expenses */}
          <Text style={styles.inputLabel}>Monthly Expenses</Text>
          <CurrencyInput
            value={monthlyExpenses}
            onChangeText={setMonthlyExpenses}
            placeholder="$0"
          />
          {inputErrors.expenses && <Text style={styles.errorText}>{inputErrors.expenses}</Text>}
          
          {/* Existing Liabilities */}
          <Text style={styles.inputLabel}>Existing Liabilities</Text>
          <CurrencyInput
            value={existingLiabilities}
            onChangeText={setExistingLiabilities}
            placeholder="$0"
          />
          {inputErrors.liabilities && <Text style={styles.errorText}>{inputErrors.liabilities}</Text>}
          
          {/* Calculate Button */}
          <TouchableOpacity 
            style={styles.calculateButton}
            onPress={calculateBorrowingCapacity}
          >
            <Text style={styles.calculateButtonText}>Estimate Borrowing Capacity</Text>
          </TouchableOpacity>
          
          {/* Borrowing Capacity Result */}
          {borrowingCapacity && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Estimated Borrowing Capacity:</Text>
              <Text style={styles.resultValue}>
                {`$${borrowingCapacity.estimatedBorrowingCapacity.toLocaleString()}`}
              </Text>
              <Text style={styles.resultDisclaimer}>
                This is an educational estimate only, not financial advice.
              </Text>
            </View>
          )}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            This information is educational only and not financial advice. Always consult with a licensed financial professional before making investment decisions.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 5,
  },
  calculateButton: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  calculateButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 5,
  },
  resultDisclaimer: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
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
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinancialDetailsScreen;