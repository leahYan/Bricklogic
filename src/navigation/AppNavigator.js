import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import PropertyGoalsScreen from '../screens/PropertyGoalsScreen';
import StrategyInsightsScreen from '../screens/StrategyInsightsScreen';
import InvestmentProfileScreen from '../screens/InvestmentProfileScreen';
import FinancialDetailsScreen from '../screens/FinancialDetailsScreen';
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
        initialRouteName="PropertyGoals"
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
        <Stack.Screen name="PropertyGoals" component={PropertyGoalsScreen} />
        <Stack.Screen name="StrategyInsights" component={StrategyInsightsScreen} />
        <Stack.Screen name="InvestmentProfile" component={InvestmentProfileScreen} />
        <Stack.Screen name="FinancialDetails" component={FinancialDetailsScreen} />
        <Stack.Screen name="LocationCriteria" component={LocationCriteriaScreen} />
        <Stack.Screen name="LocationResults" component={LocationResultsScreen} />
        <Stack.Screen name="SuburbDetail" component={SuburbDetailScreen} />
        <Stack.Screen name="BrokerConnection" component={BrokerConnectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;