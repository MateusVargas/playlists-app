import React,{useState,useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import {Button, Text, View, StyleSheet,Alert} from 'react-native';

import api from '../services/api'
import {Loading} from '../components/Loading'

export const Home = () => {
  const [totalPlaylists,setTotalPlaylists] = useState(0)
  const [totalVideos,setTotalVideos] = useState(0)
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(()=>{
      async function totalPlaylists(){
        try{
          setLoading(true)
          const response = await api.get('playlists/total')

          setTotalPlaylists(response.data.playlists)
          setTotalVideos(response.data.videos)
        }catch(e){
          console.log(e)
          Alert.alert('ocorreu um erro ao buscar os dados')
        }finally{
          setLoading(false)
        }
      }

      totalPlaylists()
    },[])
  )

  return (
    <View style={styles.container}>
      <Loading loading={loading} />

      <View style={{
        width: '90%',
        backgroundColor:'#fff',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginTop: 30,
        padding: 10
      }}>
        <View style={{
          width: '100%',
          backgroundColor: '#ffb162',
          padding:5,
          borderRadius:5,
        }}>
          <Text style={{color:'#fff'}}>PLAYLISTS CRIADAS</Text>
        </View>
        <Text style={{
          color: '#d4d4d4',
          fontSize: 50
        }}>{totalPlaylists}</Text>
      </View>

      <View style={{
        width: '90%',
        backgroundColor:'#fff',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginTop: 30,
        padding: 10
      }}>
        <View style={{
          width: '100%',
          backgroundColor: '#ffb162',
          padding:5,
          borderRadius:5,
        }}>
          <Text style={{color:'#fff'}}>VÍDEOS ADICIONADOS</Text>
        </View>
        <Text style={{
          color: '#d4d4d4',
          fontSize: 50
        }}>{totalVideos}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#307ecc',
    alignContent: 'center',
    alignItems:'center'
  },
})