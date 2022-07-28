import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import {Routes} from './src/routes'
import api from './src/services/api';
import { useAuth } from './src/contexts/Auth';

export default function App() {
  const auth = useAuth()

  api.interceptors.response.use(response => response,
    async function (error){
        if(error.response.status === 401){
            //console.log('rrrr')
            return auth.setNullUserAndToken()
        }
        return Promise.reject(error)
    }
  )

  return (
    <SafeAreaView style={{flex:1}}>
      <Routes/>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}
