import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {Home} from '../pages/Home';

import {Playlists} from '../pages/playlists/Playlists';
import {CreatePlaylist} from '../pages/playlists/Create';
import {EditPlaylist} from '../pages/playlists/Edit';
import {DetailsPlaylist} from '../pages/playlists/Show';

import {CreateVideo} from '../pages/playlists/videos/Create';

import CustomDrawer from '../components/CustomDrawer';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';

import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const PlaylistScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator 
      initialRouteName="Playlists"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "center"
      }}>
      <Stack.Screen
        name="Playlists"
        component={Playlists}
        options={{
          title: 'Playlists',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          )          
        }}
      />
      <Stack.Screen
        name="CreatePlaylist"
        component={CreatePlaylist}
        options={{
          title: 'Create Playlist'
        }}
      />
      <Stack.Screen
        name="EditPlaylist"
        component={EditPlaylist}
        options={{
          title: 'Edit Playlist'
        }}
      />
      <Stack.Screen
        name="DetailsPlaylist"
        component={DetailsPlaylist}
        options={{
          title: 'Details Playlist'
        }}
      />
      <Stack.Screen
        name="CreateVideo"
        component={CreateVideo}
        options={{
          title: 'Add Video'
        }}
      />
    </Stack.Navigator>
  );
};


export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerActiveBackgroundColor:'#307ecc',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft:-25,
          fontSize:15
        },
        headerShown: false
      }}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Home',
          drawerIcon:({color})=>(
            <Ionicons name="home-outline" size={22} color={color}/>
          ),
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="PlaylistScreenStack"
        options={{
          drawerLabel: 'Playlists',
          drawerIcon:({color})=>(
            <Ionicons name="videocam-outline" size={22} color={color}/>
          ),
        }}
        component={PlaylistScreenStack}
      />
    </Drawer.Navigator>
  );
}