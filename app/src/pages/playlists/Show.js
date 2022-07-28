import React,{useState,useCallback} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import {View,Text,StyleSheet,Alert,TouchableOpacity,Image,ScrollView,Linking,Modal,FlatList,ActivityIndicator} from 'react-native'

import {Loading} from '../../components/Loading'
import api from '../../services/api'

import { Ionicons } from '@expo/vector-icons';

export const DetailsPlaylist = ({route,navigation}) => {

	const [playlist,setPlaylist] = useState({})
	const [videos,setVideos] = useState([])
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [videoToModalOptions, setVideoToModalOptions] = useState(null);
	const [page, setPage] = useState(1);
	const [isListEnd, setIsListEnd] = useState(false);

	useFocusEffect(
		useCallback(()=>{
			fetchPlaylist();
		},[route.params.id])
	)

	const fetchPlaylist = async () => {
			try {
				if (!loading && !isListEnd) {
			  	setLoading(true)

			    const response = await api.get(`playlists/${route.params.id}?page=${page}`);
		      setPlaylist(response.data.playlist)

		      if (response.data.videos.data.length > 0) {
		      	setVideos([...videos, ...response.data.videos.data])
		      	setPage(page + 1)
		      	setLoading(false)
		    	} else {
		    		setIsListEnd(true)
		    		setLoading(false)
		    	}
	      }
	    } catch (e) {
	    	console.log('eee',e)
	    	Alert.alert('houve um erro ao buscar os dados da sua playlist.')
	    } finally{
	    	setLoading(false)
	    }
	};

	const deletePlaylistConfirm = () =>{
		return Alert.alert(
	      "Apagar playlist",
	      "Deseja apagar a playlist?",
	      [
	        // The "Yes" button
	        {
	          text: "Yes",
	          onPress: () => {
	          	deletePlaylist()
	          },
	        },
	        // The "No" button
	        // Does nothing but dismiss the dialog when tapped
	        {
	          text: "No",
	        },
	      ]
	    );
	}

	const deletePlaylist = async () =>{
		setLoading(true)

		try{
	        const response = await api.delete(`playlists/${route.params.id}`)
	        setLoading(false)
	        navigation.navigate('Playlists')
		}catch(e){
			setLoading(false)
			Alert.alert('Não foi possível remover a playlist.')
		}
	}

	const deleteVideo = async () =>{
		setLoading(true)
		setModalVisible(!modalVisible)

		try{
	        const response = await api.delete(`videos/${videoToModalOptions.id}`)
	        setLoading(false)
	        fetchPlaylist()
		}catch(e){
			setLoading(false)
			Alert.alert('Não foi possível remover a playlist.')
		}
	}

	async function openYoutube(){
		await Linking.openURL(videoToModalOptions.url)
	}

	const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator
            color="black"
            style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

	return(
		<View style={styles.container}>
			<Loading loading={loading} />

			<Modal
		        animationType="fade"
		        transparent={true}
		        visible={modalVisible}
		        onRequestClose={() => {
		          setModalVisible(!modalVisible);
		        }}
		    >
		        <View style={styles.centeredView}>
		          <View style={styles.modalView}>
		          	<View style={{flex:1}}>
			            <TouchableOpacity
			              style={[styles.button, {backgroundColor:'red'}]}
			              onPress={() => deleteVideo()}
			            >
			              	<Text style={styles.textStyle}>Apagar</Text>
			            </TouchableOpacity>

			            <TouchableOpacity
			              style={[styles.button, {backgroundColor:'red'}]}
			              onPress={() => openYoutube()}
			            >
			              	<Text style={styles.textStyle}>Ver no YouTube</Text>
			            </TouchableOpacity>
		            </View>

		            <View>
			            <TouchableOpacity
			              style={styles.buttonClose}
			              onPress={() => {
			              	setModalVisible(!modalVisible)
			              	setVideoToModalOptions(null)
			              }}
			            >
			              <Text style={styles.textButtonCloseStyle}>Cancelar</Text>
			            </TouchableOpacity>
		            </View>
		          </View>
		        </View>
		    </Modal>

			<View style={styles.title}>
				<View style={{flexDirection:'row'}}>
					<Ionicons name="headset-outline" size={35} color='#307ecc'/>
					<Text style={styles.titleText}>{playlist.name}</Text>
				</View>

				<View style={{flexDirection:'row'}}>
					<TouchableOpacity 
						style={[styles.buttonActions,{marginRight:15}]}
						onPress={()=>{
							navigation.navigate('EditPlaylist',{
								id: playlist.id,
								name: playlist.name
							})
						}}
					>
						<Ionicons name="pencil-outline" size={25} color='#fff'/>
					</TouchableOpacity>

					<TouchableOpacity onPress={deletePlaylistConfirm} style={styles.buttonActions}>
						<Ionicons name="trash-outline" size={25} color='#fff'/>
					</TouchableOpacity>
				</View>
			</View>

			{/* !videos.lenght && (<Text style={{marginTop:40}}>Nenhum video adicionado para essa playlist.</Text>)*/}

			<View style={{flex:5,marginTop:10}}>
				<FlatList
          data={videos}
          renderItem={({ item, index, separators })=>(
            <TouchableOpacity 
								key={index} 
								style={{
									alignSelf:'center',
									height:250,
									width:'90%',
									padding:10,
									margin:15,
									borderRadius:10,
									marginTop: 20,
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 4,
									},
									shadowOpacity: 0.32,
									shadowRadius: 5.46,
									elevation: 9,
								}}
								onPress={() => {
									setModalVisible(true)
									setVideoToModalOptions(item)
								}}>	
								<View style={{flex:5}}>
									<Image
										style={styles.logo}
										source={{
											uri: `https://img.youtube.com/vi/${item.url.slice(17)}/0.jpg`
										}}
									/>
								</View>
								<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<Text style={{color:'#000',fontSize:10,fontWeight:'700'}}>
										{item.title}
									</Text>
								</View>
							</TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          onEndReached={fetchPlaylist}
          onEndReachedThreshold={0.5}
        />

				{/*<ScrollView
				>
					{videos.map(video=>{
						return(
							<TouchableOpacity 
								key={video.id} 
								style={{
									alignSelf:'center',
									height:250,
									width:'90%',
									padding:10,
									margin:15,
									borderRadius:10,
									marginTop: 20,
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 4,
									},
									shadowOpacity: 0.32,
									shadowRadius: 5.46,
									elevation: 9,
								}}
								onPress={() => {
									setModalVisible(true)
									setVideoToModalOptions(video)
								}}>	
								<View style={{flex:5}}>
									<Image
										style={styles.logo}
										source={{
											uri: `https://img.youtube.com/vi/${video.url.slice(17)}/0.jpg`
										}}
									/>
								</View>
								<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<Text style={{color:'#000',fontSize:10,fontWeight:'700'}}>
										{video.title}
									</Text>
								</View>
							</TouchableOpacity>
						)
					})}
				</ScrollView>*/}
			</View>
	

			<View style={styles.bottom}>
		        <TouchableOpacity 
		          style={styles.buttonAdd} 
		          onPress={()=>navigation.navigate('CreateVideo',{
		          	playlist_id: playlist.id
		          })}
		        >
		          <Ionicons name="add-outline" size={35} color='#fff'/>
		        </TouchableOpacity>
		    </View>
			
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'flex-start'
	},
	title:{
		padding: 20,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		alignSelf:'center',
		backgroundColor: '#fff',
		width: '90%',
		borderRadius:10,
		marginTop: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,
		elevation: 9,
	},
	titleText:{
		fontSize: 20,
		marginLeft: 10,
		color:'#307ecc'
	},
	buttonActions:{
		backgroundColor: '#307ecc',
	    width: 45,
	    height: 45,
	    alignItems: 'center',
	    borderRadius: 50,
	    justifyContent: 'center'
	},
	bottom:{
	    flex:1,
	    justifyContent: 'flex-end',
	    alignSelf: 'flex-end',
	    marginBottom: 20,
	    marginRight: 20,
	    zIndex:100
	},
	buttonAdd:{
	    backgroundColor: '#307ecc',
	    width: 55,
	    height: 55,
	    alignItems: 'center',
	    borderRadius: 50,
	    justifyContent: 'center'
	},
	logo:{
		flex: 1,
		margin:10,
		borderRadius:10,
    width: null,
    height: null,
    resizeMode: 'cover',
	},


	centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
  	width: 220,
  	height:220,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginBottom:10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    
  },
  textButtonCloseStyle:{
  	color: "#2196F3",
  	fontSize:15,
  	fontWeight:'700'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },



  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
})