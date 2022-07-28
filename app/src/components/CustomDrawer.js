import React from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {useAuth} from '../contexts/Auth';
import BgImage from '../assets/bg-drawer.jpg'

import { Ionicons } from '@expo/vector-icons';

const CustomSidebarMenu = (props) => {
  const auth = useAuth();
  
  const signOut = async () => {
    await auth.signOut();
  };

  return (
    // <View style={stylesSidebar.sideMenuContainer}>
    //   <View style={stylesSidebar.profileHeader}>
    //     <View style={stylesSidebar.profileHeaderPicCircle}>
    //       <Text style={{fontSize: 25, color: '#307ecc'}}>
    //         {auth.user.name.charAt(0)}
    //       </Text>
    //     </View>
    //     <Text style={stylesSidebar.profileHeaderText}>
    //       {auth.user.name}
    //     </Text>
    //   </View>
    //   <View style={stylesSidebar.profileHeaderLine} />

    //   <DrawerContentScrollView {...props}>
    //     <DrawerItemList {...props} />

    //     <DrawerItem
    //       label={({color}) => 
    //         <Text style={{color: '#fff'}}>
    //           Sair
    //         </Text>
    //       }
    //       onPress={signOut}
    //     />
    //   </DrawerContentScrollView>
    // </View>
    <View style={{flex:1}}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{backgroundColor:'#307ecc'}}
      >

        <ImageBackground 
          style={{padding:20}}
          source={require('../assets/bg-drawer.jpg')}
        >
          <View style={{alignItems:'flex-start'}}>
            <View style={stylesSidebar.profileHeaderPicCircle}>
              <Text style={{fontSize: 25, color: '#307ecc'}}>
                {auth.user.name.charAt(0)}
              </Text>
            </View>
            <Text style={stylesSidebar.profileHeaderText}>
              Bem-vindo {auth.user.name}
            </Text>
            <Text style={{fontSize:7,color:'#fff'}}>
              Photo by Josh Sorenson on Unsplash
            </Text>
          </View>
        </ImageBackground>

        <View style={{flex:1,backgroundColor:'#fff',paddingTop:10}}>
          <DrawerItemList {...props} />
        </View>

        {/*<DrawerItem
          label={({color}) => 
            <Text style={{color: '#fff'}}>
              Sair
            </Text>
          }
          onPress={signOut}
        />*/}
      </DrawerContentScrollView>

      <View style={{padding:20,borderTopWidth:1,borderTopColor:'#ccc'}}>
        <TouchableOpacity onPress={signOut} style={{paddingVertical:15}}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name="exit-outline" size={22}/>
            <Text style={{fontSize:15,marginLeft:5}}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
//   sideMenuContainer: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#307ecc',
//     paddingTop: 40,
//     color: '#fff',
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#307ecc',
//     padding: 15,
//     textAlign: 'center',
//   },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5
  },
  profileHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom:10
  },
//   profileHeaderLine: {
//     height: 1,
//     marginHorizontal: 20,
//     backgroundColor: '#e2e2e2',
//     marginTop: 15,
//   }
});