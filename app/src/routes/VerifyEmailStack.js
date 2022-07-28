import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VerifyEmail } from '../pages/account/VerifyEmail';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

export const VerifyEmailStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};