import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CurrencyInput = ({ 
  value, 
  onChangeText, 
  currency = 'USD', 
  onCurrencyChange,
  placeholder = 'Enter amount'
}) => {
  // Format the input as currency
  const formatAsCurrency = (text) => {
    // Remove all non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Format with commas
    if (numericValue) {
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedValue;
    }
    return '';
  };

  // Handle text change
  const handleChangeText = (text) => {
    const formatted = formatAsCurrency(text);
    onChangeText(formatted);
  };

  // Handle currency selection
  const handleCurrencyPress = () => {
    if (onCurrencyChange) {
      // In a real app, this would open a currency selector
      // For MVP, we'll just use USD
      onCurrencyChange(currency);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={styles.currencySelector}
        onPress={handleCurrencyPress}
      >
        <Text style={styles.currencyText}>{currency}</Text>
        <Ionicons name="chevron-down" size={16} color="#0066FF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
  },
  currencyText: {
    fontSize: 16,
    color: '#0066FF',
    marginRight: 4,
  },
});

export default CurrencyInput;