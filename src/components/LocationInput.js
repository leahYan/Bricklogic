import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const LocationInput = ({ onPress, placeholder = 'Search location' }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Ionicons name="location-outline" size={20} color={theme.colors.accent} />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </TouchableOpacity>
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
    paddingVertical: 12,
    backgroundColor: theme.colors.inputBackground,
  },
  placeholder: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.inputPlaceholder,
    marginLeft: 8,
  },
});

export default LocationInput;