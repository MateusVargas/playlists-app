//podia usar deep linking para abrir o link do email direto no app e não na api

import React, {useState,createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import {Loading} from '../../components/Loading'

import api from '../../services/api'

export const ForgotPassword = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [linkSendSuccess, setLinkSendSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPassword = async () => {
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    try{
      setLoading(true)

      const response = await api.post('/forgot-password',{email:userEmail})

      if (response.success) {
        setResponseMessage(response.data.msg)
        setLinkSendSuccess(true);
      } 

    }catch(error){
      console.log(error.response.data.error)
      Alert.alert(error.response.data.error)
    }finally{
      setLoading(false)
    }    
  };

  if (linkSendSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        
        <Text style={styles.successTextStyle}>
          {responseMessage}
        </Text>

        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonTextStyle}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>

        <KeyboardAvoidingView enabled>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={forgotPassword}>
            <Text style={styles.buttonTextStyle}>ENVIAR</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ScrollView>
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
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});