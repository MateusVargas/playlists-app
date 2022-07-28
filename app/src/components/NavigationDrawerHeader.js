import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  
  return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Ionicons name="menu-outline" size={30} color='#fff'/>
        </TouchableOpacity>
      </View>
    );
  };
  export default NavigationDrawerHeader;