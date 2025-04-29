import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BrokerConnectionScreen = ({ navigation }) => {
  // State for form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mock broker data
  const brokers = [
    {
      name: 'Sarah Johnson',
      company: 'Mortgage Masters',
      phone: '0412 345 678',
      email: 'sarah.j@mortgagemasters.com.au',
      specialization: 'First Home Buyers, Investors'
    },
    {
      name: 'Michael Chen',
      company: 'Property Finance Group',
      phone: '0423 456 789',
      email: 'michael.c@pfgroup.com.au',
      specialization: 'Investment Properties, Refinancing'
    },
    {
      name: 'Jessica Williams',
      company: 'Aussie Home Loans',
      phone: '0434 567 890',
      email: 'jessica.w@aussieloans.com.au',
      specialization: 'Residential Properties, Construction Loans'
    }
  ];

  // Handle connect button press
  const handleConnect = () => {
    // In a real app, we would submit the form data
    // For MVP, we'll just set formSubmitted to true
    setFormSubmitted(true);
  };

  // Handle skip button press
  const handleSkip = () => {
    // Navigate to a placeholder end screen
    navigation.navigate('InvestmentProfile'); // For MVP, just go back to start
  };

  // Handle done button press
  const handleDone = () => {
    // Navigate to a placeholder end screen
    navigation.navigate('InvestmentProfile'); // For MVP, just go back to start
  };

  // Validate form
  const isFormValid = name.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && consentGiven;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connect with a Broker</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {!formSubmitted ? (
          <>
            <View style={styles.promptContainer}>
              <Text style={styles.promptTitle}>Ready to take the next step?</Text>
              <Text style={styles.promptText}>
                Connect with a vetted mortgage broker who can help you understand your borrowing capacity and financing options for your property investment journey.
              </Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Your Contact Information</Text>
              
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />
              
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
              
              <View style={styles.consentContainer}>
                <Switch
                  value={consentGiven}
                  onValueChange={setConsentGiven}
                  trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
                  thumbColor={consentGiven ? '#4CAF50' : '#F5F5F5'}
                />
                <Text style={styles.consentText}>
                  I consent to being contacted by a mortgage broker regarding my property investment interests.
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.connectButton, !isFormValid && styles.connectButtonDisabled]}
                onPress={handleConnect}
                disabled={!isFormValid}
              >
                <Text style={styles.connectButtonText}>Connect with a Broker</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.skipButton}
                onPress={handleSkip}
              >
                <Text style={styles.skipButtonText}>Maybe Later</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successText}>
              Your information has been submitted. A mortgage broker will contact you within 1-2 business days to discuss your property investment options.
            </Text>
            
            <View style={styles.brokersContainer}>
              <Text style={styles.brokersTitle}>Our Vetted Brokers</Text>
              
              {brokers.map((broker, index) => (
                <View key={index} style={styles.brokerCard}>
                  <Text style={styles.brokerName}>{broker.name}</Text>
                  <Text style={styles.brokerCompany}>{broker.company}</Text>
                  <Text style={styles.brokerSpecialization}>{broker.specialization}</Text>
                  <View style={styles.brokerContactRow}>
                    <Ionicons name="call-outline" size={16} color="#4CAF50" />
                    <Text style={styles.brokerContactText}>{broker.phone}</Text>
                  </View>
                  <View style={styles.brokerContactRow}>
                    <Ionicons name="mail-outline" size={16} color="#4CAF50" />
                    <Text style={styles.brokerContactText}>{broker.email}</Text>
                  </View>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            Bricklogic may receive a referral fee if you engage with one of our partner brokers. This does not affect the cost of services provided to you. All brokers are independently licensed and vetted for quality service.
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
  },
  promptContainer: {
    marginBottom: 25,
  },
  promptTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  promptText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  formContainer: {
    marginBottom: 25,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  consentText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 25,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  connectButtonDisabled: {
    backgroundColor: '#A5D6A7',
    opacity: 0.7,
  },
  connectButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '500',
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
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 15,
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    lineHeight: 24,
    marginBottom: 30,
  },
  brokersContainer: {
    width: '100%',
    marginBottom: 30,
  },
  brokersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  brokerCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  brokerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  brokerCompany: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  brokerSpecialization: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  brokerContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  brokerContactText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BrokerConnectionScreen;