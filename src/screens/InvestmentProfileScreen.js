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
import BudgetSlider from '../components/BudgetSlider';
import CurrencyInput from '../components/CurrencyInput';
import LocationInput from '../components/LocationInput';
import RadioButton from '../components/RadioButton';
import { estimateBorrowingCapacity, formatCurrency, parseCurrency, validateFinancialInput } from '../services/FinancialService';

const InvestmentProfileScreen = ({ navigation }) => {
  // State for form values
  const [budget, setBudget] = useState(500000);
  const [cashAvailable, setCashAvailable] = useState('');
  const [location, setLocation] = useState('');
  const [investmentGoal, setInvestmentGoal] = useState('growth'); // 'growth', 'yield', or 'flipping'
  
  // Financial information state
  const [annualIncome, setAnnualIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [existingLiabilities, setExistingLiabilities] = useState('');
  const [borrowingCapacity, setBorrowingCapacity] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Handle slider change
  const handleSliderChange = (value) => {
    setBudget(value);
  };

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
  
  // Handle generate strategy button press
  const handleGenerateStrategy = () => {
    // In a real app, we would save the data and navigate to the next screen
    // For MVP, we'll just log the data
    console.log({
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
    
    // Navigate to the next screen (Strategy Insights)
    navigation.navigate('StrategyInsights');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Investment Profile</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>Step 1 of 3</Text>
          <Text style={styles.preferencesText}>Investment Preferences</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        {/* Investment Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Budget</Text>
          
          {/* Budget Slider Component */}
          <BudgetSlider 
            minValue={100000}
            maxValue={1000000}
            initialValue={budget}
            onValueChange={setBudget}
          />
        </View>

        {/* Upfront Cash Available */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upfront Cash Available</Text>
          <CurrencyInput
            value={cashAvailable}
            onChangeText={setCashAvailable}
            currency="USD"
            onCurrencyChange={(currency) => console.log('Currency changed:', currency)}
          />
        </View>

        {/* Investment Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Location</Text>
          <LocationInput 
            onPress={() => console.log('Location search pressed')}
            placeholder="Search location"
          />
        </View>

        {/* Investment Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Goal</Text>
          
          {/* Radio buttons for investment goals */}
          <RadioButton
            label="Long-term capital growth"
            selected={investmentGoal === 'growth'}
            onSelect={() => setInvestmentGoal('growth')}
          />
          
          <RadioButton
            label="High rental yield"
            selected={investmentGoal === 'yield'}
            onSelect={() => setInvestmentGoal('yield')}
          />
          
          <RadioButton
            label="Flipping for profit"
            selected={investmentGoal === 'flipping'}
            onSelect={() => setInvestmentGoal('flipping')}
          />
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
            <Text style={styles.calculateButtonText}>Calculate Estimated Capacity</Text>
          </TouchableOpacity>
          
          {/* Borrowing Capacity Result */}
          {borrowingCapacity && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Estimated Borrowing Capacity:</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(borrowingCapacity.estimatedBorrowingCapacity)}
              </Text>
              <Text style={styles.disclaimerText}>
                This is an educational estimate only, not financial advice.
              </Text>
            </View>
          )}
        </View>

        {/* Generate Investment Strategy Button */}
        <TouchableOpacity 
          style={styles.generateButton}
          onPress={handleGenerateStrategy}
        >
          <Text style={styles.generateButtonText}>Generate Investment Strategy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoButton: {
    padding: 8,
  },
  progressContainer: {
    marginBottom: 24,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
  },
  preferencesText: {
    fontSize: 14,
    color: '#0066FF',
    textAlign: 'right',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    width: '33%',
    height: 4,
    backgroundColor: '#0066FF',
    borderRadius: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
    marginBottom: 8,
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  resultContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  resultLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  generateButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InvestmentProfileScreen;