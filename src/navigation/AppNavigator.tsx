import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import StoreScreen from '../screens/StoreScreen'; // Add this import
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: true , headerStyle:{ backgroundColor: '#80EF80'}, headerTintColor: 'black'}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false  }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Store" component={StoreScreen} options={{ title: 'Stored Users' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
