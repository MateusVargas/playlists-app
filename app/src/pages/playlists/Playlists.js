import React, {useState,useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native'

import {Button, Text, View, StyleSheet, TouchableOpacity,Alert,FlatList} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {Loading} from '../../components/Loading'
import api from '../../services/api'

export const Playlists = ({navigation}) => {
  const [playlists,setPlaylists] = useState([])
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchPlaylists()
    },[])
  )

  const fetchPlaylists = async() =>{
    try{
      setLoading(true)

      const response = await api.get('playlists')

      setPlaylists(response.data.playlists)
    }catch(error){
      Alert.alert('Não foi possível buscar as suas playlists.')
    }finally{
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Loading loading={loading} />

      <View style={{flex:5}}>
        <FlatList
          data={playlists}
          renderItem={({ item, index, separators })=>(
            <TouchableOpacity 
              style={styles.playlist} 
              key={item.id}
              onPress={()=>{
                navigation.navigate('DetailsPlaylist',{
                  id: item.id
                })
              }}>
              <Text style={styles.playlistText}>{item.name}</Text>
              <Ionicons name="chevron-forward-outline" size={35} color='#ffb162'/>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity 
          style={styles.buttonAdd} 
          onPress={()=>navigation.navigate('CreatePlaylist')}
        >
          <Ionicons name="add-outline" size={35} color='#ffb162'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  playlist:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  playlistText:{
    color: '#000',
    fontSize: 18
  },
  bottom:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginRight: 20
  },
  buttonAdd:{
    backgroundColor: '#fff',
    width: 55,
    height: 55,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center'
  }
})