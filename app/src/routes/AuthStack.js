import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SignIn} from '../pages/account/SignIn';
import {Register} from '../pages/account/Register';
import {ForgotPassword} from '../pages/account/ForgotPassword';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{
            title: 'Criar conta', //Set Header Title
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
          options={{
            title: 'Esqueci minha senha', //Set Header Title
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};