import React,{useState} from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,Alert} from 'react-native'

import image from '../../assets/video.png'

import {Loading} from '../../components/Loading'
import api from '../../services/api'

export const EditPlaylist = ({route,navigation}) => {
	const params = route.params;

	const [name,setName] = useState(params.name)
	const [loading,setLoading] = useState(false)

	const savePlaylist = async () => {
    if (!name) {
      alert('Please fill Name');
      return;
    }

    try{
      setLoading(true)

      const response = await api.put(`playlists/${params.id}`,{name})

      if (response.data.success) {
        Alert.alert(response.data.message)
        setLoading(false)
        navigation.navigate('Playlists')
      } 

    }catch(error){
      console.log('33',error.response.data)
      setLoading(false)
      Alert.alert('Não foi possível salvar.')
    }
  }

	return(
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
		        value={name}
		        onChangeText={(name) => setName(name)}
		        underlineColorAndroid="#f000"
		        placeholder="Playlist Name"
		        placeholderTextColor="#8b9cb5"
		    />

		    <TouchableOpacity
		        style={styles.buttonStyle}
		        activeOpacity={0.5}
		        onPress={savePlaylist}>
		        <Text style={styles.buttonTextStyle}>SALVAR</Text>
		    </TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignContent:'center',
		justifyContent:'center'
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
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#dadae8',
  },
})