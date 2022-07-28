import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, TextInput, TouchableOpacity,Image,Alert} from 'react-native';

import image from '../../../assets/video.png'

import {Loading} from '../../../components/Loading'
import api from '../../../services/api'

export const CreateVideo = ({route, navigation}) => {
  const [url,setUrl] = useState('')
  const [title,setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const saveVideo = async () => {
    if (!url || !title) {
      alert('Please fill inputs');
      return;
    }

    try{
      setLoading(true)
      
      const response = await api.post('videos',{url,title,playlist_id:route.params.playlist_id})

      if (response.data.success) {
        Alert.alert(response.data.message)
        setLoading(false)
        navigation.navigate('DetailsPlaylist',{
          id: route.params.playlist_id
        })
      } 

    }catch(error){
      console.log('33',error.response.data)
      setLoading(false)
      Alert.alert('Não foi possível salvar.')
    }
  }

  return (
    <View style={styles.container}>
      <Loading loading={loading} />

      <View style={{alignItems: 'center'}}>
        <Image 
          source={image}
          style={{marginBottom: 30}}
        />
      </View>

      <TextInput
        style={styles.inputStyle}
        onChangeText={(title) => setTitle(title)}
        underlineColorAndroid="#f000"
        placeholder="Title Video"
        placeholderTextColor="#8b9cb5"
      />

      <TextInput
        style={styles.inputStyle}
        onChangeText={(url) => setUrl(url)}
        underlineColorAndroid="#f000"
        placeholder="URL Video"
        placeholderTextColor="#8b9cb5"
      />

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={saveVideo}>
        <Text style={styles.buttonTextStyle}>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#ffb162',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#ffb162',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputStyle: {
    color: '#000',
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#dadae8',
  },
})