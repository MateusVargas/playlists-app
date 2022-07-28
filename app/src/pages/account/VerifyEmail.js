import React, {useState} from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Alert} from 'react-native';

import {Loading} from '../../components/Loading'
import {useAuth} from '../../contexts/Auth';

import api from '../../services/api'

export const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const resendEmailLink = async () => {
    try{
      setLoading(true)

      const response = await api.post('/email/resend')

      Alert.alert(response.data.msg)
    }catch(error){
      console.log(error)
      Alert.alert(error.response.data.error)
    }finally{
      setLoading(false)
    }
  };

  const signOut = async () => {
    await auth.signOut()
  }

  return (
    <View style={styles.container}>
      <Loading loading={loading} />

      <Text style={styles.text}>Verifique seu e-mail</Text>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={resendEmailLink}>
        <Text style={styles.buttonTextStyle}>VALIDAR E-MAIL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSair}
        activeOpacity={0.5}
        onPress={signOut}>
        <Text style={styles.buttonTextStyle}>SAIR</Text>
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#ffb162',
    borderWidth: 0,
    color: '#FFF',
    borderColor: '#ffb162',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    justifyContent: 'center'
  },
  buttonSair: {
    backgroundColor: '#adadad',
    borderWidth: 0,
    color: '#FFF',
    borderColor: '#ffb162',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 55,
    marginRight: 55,
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  text:{
    color: '#fff',
    fontSize: 17,
    textAlign: 'center'
  }
})
