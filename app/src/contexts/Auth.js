import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import api from '../services/api'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  	const [user, setUser] = useState(null);
  	const [loading, setLoading] = useState(true);

  	useEffect(() => {
    	loadStorageData();
  	}, []);

  	async function loadStorageData(){
    	try {
	    	const user = await AsyncStorage.getItem('@user');
	    	const token = await AsyncStorage.getItem('@token');

	    	if(user && token){
				api.defaults.headers.Authorization = `Bearer ${token}`
				setUser(JSON.parse(user)) 
			}
	    } catch (error) {} 
	   	finally {
	    	setLoading(false);
	    }
  	}

  	async function signIn(data, remember){
	    try{
	    	console.log('w',remember)
	        setLoading(true)
	        if(remember){
	            await AsyncStorage.setItem('@email',JSON.stringify(data.email))
	            await AsyncStorage.setItem('@password',JSON.stringify(data.password))
	        }
	        else{
	            const email = await AsyncStorage.getItem('@email')
	            const password = await AsyncStorage.getItem('@password')

	            if(email && password){
	                await AsyncStorage.removeItem('@email')
	                await AsyncStorage.removeItem('@password')
	            }
	        }

	        const response = await api.post('/login',data)

	        if(response.data.user && response.data.token){
	        	await AsyncStorage.setItem('@user',JSON.stringify(response.data.user))
	        	await AsyncStorage.setItem('@token',response.data.token)
		        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
	        	setUser(response.data.user)
	        }
        }catch(error){
            Alert.alert(error.response.data.error || 'erro, verifique seus dados')
        }finally{
        	setLoading(false)
        }
  	};

  	async function signOut(){
  		try{
  			setLoading(true)

  			const response = await api.post('/logout')
  			if (response.data.success) {
		    	await setNullUserAndToken()
  			}

  		}catch(error){
  			Alert.alert('Não foi possível sair')
  		}finally{
			setLoading(false)
		}
 	};


	async function setNullUserAndToken(){
		await AsyncStorage.removeItem('@token')
		await AsyncStorage.removeItem('@user')
		setUser(null)
	}

  	return (
    	<AuthContext.Provider value={{
			signed: !!user, 
			user, 
			loading, 
			signIn, 
			signOut, 
			setNullUserAndToken
		}}>
      		{children}
    	</AuthContext.Provider>
  	);
};

function useAuth(){
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};