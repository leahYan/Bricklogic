import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import InvestmentProfileScreen from '../screens/InvestmentProfileScreen';
import StrategyInsightsScreen from '../screens/StrategyInsightsScreen';
import LocationCriteriaScreen from '../screens/LocationCriteriaScreen';
import LocationResultsScreen from '../screens/LocationResultsScreen';
import SuburbDetailScreen from '../screens/SuburbDetailScreen';
import BrokerConnectionScreen from '../screens/BrokerConnectionScreen';

// Create stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InvestmentProfile"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
              margin: 10,
              borderWidth: 1,
              borderColor: '#F5F5F5'
            }
          })
        }}
      >
        <Stack.Screen name="InvestmentProfile" component={InvestmentProfileScreen} />
        <Stack.Screen name="StrategyInsights" component={StrategyInsightsScreen} />
        <Stack.Screen name="LocationCriteria" component={LocationCriteriaScreen} />
        <Stack.Screen name="LocationResults" component={LocationResultsScreen} />
        <Stack.Screen name="SuburbDetail" component={SuburbDetailScreen} />
        <Stack.Screen name="BrokerConnection" component={BrokerConnectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;