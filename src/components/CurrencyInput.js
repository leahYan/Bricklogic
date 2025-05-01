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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
    backgroundColor: theme.colors.inputBackground,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.accent,
  },
  currencyText: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: '500',
    color: theme.colors.accent,
    marginRight: 4,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.small,
    marginTop: 4,
  },
});

export default CurrencyInput;