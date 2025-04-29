import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const BudgetSlider = ({ minValue = 100000, maxValue = 1000000, initialValue = 500000, onValueChange }) => {
  const [value, setValue] = useState(initialValue);
  const [sliderWidth, setSliderWidth] = useState(0);
  const pan = new Animated.Value(0);

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
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset(pan._value);
      pan.setValue(0);
    },
    onPanResponderMove: (_, gesture) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, pan._offset + gesture.dx));
      pan.setValue(newPosition - pan._offset);
      const newValue = calculateValue(newPosition);
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    onPanResponderRelease: () => {
      pan.flattenOffset();
    }
  });

  // Update the thumb position when the value changes
  useEffect(() => {
    if (sliderWidth > 0) {
      const position = calculateThumbPosition(value);
      pan.setValue(position);
    }
  }, [value, sliderWidth]);

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{formatCurrency(value)}</Text>
      
      <View 
        style={styles.sliderContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setSliderWidth(width);
          const position = calculateThumbPosition(value);
          pan.setValue(position);
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
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  sliderContainer: {
    height: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#0066FF',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 8,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0066FF',
    position: 'absolute',
    top: 0,
    marginLeft: -10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default BudgetSlider;