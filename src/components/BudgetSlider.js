import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const BudgetSlider = ({ minValue = 100000, maxValue = 1000000, initialValue = 500000, onValueChange }) => {
  const [value, setValue] = useState(initialValue);
  const [sliderWidth, setSliderWidth] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;
  const panOffset = useRef(0);

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Calculate the position of the thumb based on the value
  const calculateThumbPosition = (val) => {
    return ((val - minValue) / (maxValue - minValue)) * sliderWidth;
  };

  // Calculate the value based on the position of the thumb
  const calculateValue = (position) => {
    const ratio = position / sliderWidth;
    const newValue = minValue + ratio * (maxValue - minValue);
    return Math.round(newValue / 1000) * 1000; // Round to nearest thousand
  };

  // Set up pan responder for the slider thumb
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Store the current value as offset
        pan.extractOffset();
        panOffset.current = calculateThumbPosition(value);
      },
      onPanResponderMove: (_, gesture) => {
        // Calculate new position within bounds
        const newPosition = Math.max(0, Math.min(sliderWidth, panOffset.current + gesture.dx));
        pan.setValue(newPosition);
        
        // Calculate and update the value
        const newValue = calculateValue(newPosition);
        setValue(newValue);
        if (onValueChange) {
          onValueChange(newValue);
        }
      },
      onPanResponderRelease: () => {
        // Update the offset for next interaction
        panOffset.current = calculateThumbPosition(value);
        pan.flattenOffset();
      }
    })
  ).current;

  // Update the thumb position when the value or slider width changes
  useEffect(() => {
    if (sliderWidth > 0) {
      const position = calculateThumbPosition(value);
      pan.setValue(position);
      panOffset.current = position;
    }
  }, [value, sliderWidth, minValue, maxValue]);

  // Initialize the component with proper values
  useEffect(() => {
    // Set initial value when component mounts or when initialValue changes
    setValue(initialValue);
    
    // Cleanup function to prevent memory leaks
    return () => {
      pan.removeAllListeners();
    };
  }, [initialValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{formatCurrency(value)}</Text>
      
      <View 
        style={styles.sliderContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setSliderWidth(width);
          // Only set position if width has changed
          if (width > 0) {
            const position = calculateThumbPosition(value);
            pan.setValue(position);
          }
        }}
      >
        <View style={styles.sliderTrack} />
        <Animated.View 
          style={[
            styles.sliderFill, 
            { width: pan }
          ]} 
        />
        <Animated.View 
          style={[
            styles.sliderThumb, 
            { transform: [{ translateX: pan }] }
          ]}
          {...panResponder.panHandlers}
        />
      </View>
      
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>{formatCurrency(minValue)}</Text>
        <Text style={styles.sliderLabel}>{formatCurrency(maxValue)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  valueText: {
    fontSize: theme.typography.fontSize.xxlarge,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: theme.colors.text,
  },
  sliderContainer: {
    height: 40,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 6,
    width: '100%',
    backgroundColor: theme.colors.progressTrack,
    borderRadius: 3,
    position: 'absolute',
  },
  sliderFill: {
    height: 6,
    backgroundColor: theme.colors.accent,
    borderRadius: 3,
    position: 'absolute',
    left: 0,
  },
  dollarIcon: {
    position: 'absolute',
    right: -30,
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.accent,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.inputText,
  },
});

export default BudgetSlider;