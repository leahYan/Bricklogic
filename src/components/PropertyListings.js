import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PropertyListings = ({ properties, loading, error, onPropertyPress }) => {
  // Render property item
  const renderPropertyItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.propertyItem}
      onPress={() => onPropertyPress(item)}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.propertyImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Ionicons name="home-outline" size={40} color="#BDBDBD" />
        </View>
      )}
      <View style={styles.propertyDetails}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyAddress} numberOfLines={2}>{item.address}</Text>
        <View style={styles.propertyFeatures}>
          {item.bedrooms && (
            <View style={styles.featureItem}>
              <Ionicons name="bed-outline" size={16} color="#666" />
              <Text style={styles.featureText}>{item.bedrooms}</Text>
            </View>
          )}
          {item.bathrooms && (
            <View style={styles.featureItem}>
              <Ionicons name="water-outline" size={16} color="#666" />
              <Text style={styles.featureText}>{item.bathrooms}</Text>
            </View>
          )}
          {item.carSpaces && (
            <View style={styles.featureItem}>
              <Ionicons name="car-outline" size={16} color="#666" />
              <Text style={styles.featureText}>{item.carSpaces}</Text>
            </View>
          )}
        </View>
        {item.propertyType && (
          <Text style={styles.propertyType}>{item.propertyType}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Finding properties...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={40} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Ionicons name="home-outline" size={40} color="#BDBDBD" />
        <Text style={styles.noResultsText}>No properties found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={properties}
      renderItem={renderPropertyItem}
      keyExtractor={(item, index) => `property-${index}`}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  propertyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyDetails: {
    padding: 15,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  propertyAddress: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  propertyFeatures: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  propertyType: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default PropertyListings;