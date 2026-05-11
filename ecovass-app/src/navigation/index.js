// src/navigation/index.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; 

// Importando nossas telas
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RotasScreen from '../screens/RotasScreen';
import CuponsScreen from '../screens/CuponsScreen';

import colors from '../constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          
          height: Platform.OS === 'ios' ? 88 : 65, 
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          
          // Sombra sutil
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 5,
          elevation: 8,
        },
        tabBarActiveTintColor: colors.primary,      
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          marginTop: Platform.OS === 'ios' ? 5 : 2,
        },
      }}
    >
      <Tab.Screen 
        name="Início" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={22} 
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Rotas" 
        component={RotasScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "calendar" : "calendar-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Prêmios" 
        component={CuponsScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "gift" : "gift-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
}