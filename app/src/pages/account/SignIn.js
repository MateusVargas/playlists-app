import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  Text, 
  TextInput,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Loading} from '../../components/Loading'
import {useAuth} from '../../contexts/Auth';

import Logo from '../../assets/logo.png'

export const SignIn = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const [rememberMe,setRememberMe] = useState(false)

  const passwordInputRef = createRef();

  const auth = useAuth();

  useEffect(()=>{
    getRememberedUser()
  },[])

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const getRememberedUser = async () => {
    const email = await AsyncStorage.getItem('@email')
    const password = await AsyncStorage.getItem('@password')

    if (email && password) {
      setUserEmail(JSON.parse(email))
      setUserPassword(JSON.parse(password))
      setRememberMe(true)
    }
  }

  const signIn = async () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    setLoading(true);

    let dataToSend = {
      email: userEmail, 
      password: userPassword,
      device_name: 'android'
    };

    await auth.signIn(dataToSend,rememberMe);
  };

  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>

      <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={Logo}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                value={userEmail}
                placeholder="Enter Email"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                value={userPassword}
                placeholder="Enter Password" //12345
                placeholderTextColor="#a9a9a9"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={signIn}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPassworddButtonStyle}
              activeOpacity={0.5}
              onPress={()=>navigation.navigate('ForgotPassword')}>
              <Text style={styles.buttonTextStyle}>
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

            <View style={styles.SectionRemember}>
              <Text style={styles.rememberTextStyle}>Lembrar-me</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={rememberMe}
                onValueChange={toggleRememberMe}
              />
            </View>

            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              Não tem uma conta ? Cadastre-se
            </Text>

          </KeyboardAvoidingView>
        </View>
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
  forgotPassworddButtonStyle: {
    alignItems: 'center',
    color: '#FFF',
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
  SectionRemember:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginLeft: 35,
    marginRight: 35
  },
  rememberTextStyle:{
    color:'#fff',
    fontSize: 12,
    marginRight: 5
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});