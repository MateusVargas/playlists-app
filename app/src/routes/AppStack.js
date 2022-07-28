import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MyDrawer} from './DrawerStackNavigation';

//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Drawer" component={MyDrawer} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};