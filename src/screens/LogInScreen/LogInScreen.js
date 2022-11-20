import { StyleSheet, Text, TextInput, Button,  View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/favicon.png';
import React from 'react'
import {appBackgroundColor, appButtonColor, appTextColor, appFont} from '../../UniversalAppDesignVars'
import { AppConfig } from '../../../config';


function LogInScreen ( {navigation}) {
var [email, onChangeEmail] = React.useState('advisor8@user.com');
var [password, onChangePassword] = React.useState('advisoristhebest8');

const {width} = useWindowDimensions();
const {height} = useWindowDimensions();

const onSubmit = async () => {
  console.log('submit')
  console.log(email)
  console.log(password)


      const login = await fetch(`${AppConfig.apiUrl}/users/login?` + new URLSearchParams({
          email: email,
          password: password,

          
      }))

      const user = await login.json()
      console.log(user)
      await AsyncStorage.setItem('token', user.token);
      navigation.navigate('Main Screen')
}

async function setToken(user) {
  try {
    await AsyncStorage.setItem('token', user.token);
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
}



  return (
    <View style = {styles.logInScreenStyle}>
    <View style = {styles.root}>
        <Image source = {Logo} style = {[styles.logo, {height: height*0.2}]} resizeMode = "contain"/>
    </View>
    <View>
    <SafeAreaView style = {styles.root}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Your Email"
        placeholderTextColor = '#D5B877'
      />
      <TextInput
        style={styles.input}
        secureTextEntry = {true}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Your Password"
        placeholderTextColor = '#D5B877'
      />
      <TouchableOpacity 
        style = {styles.logInButton}
        disabled = {!email || !password}
        onPress = {onSubmit}>
          <Text style = {styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
    
    </SafeAreaView>
    </View>
    <View style = {styles.root}>
      <Text style = {styles.styleOfText}>Don't have an account?</Text>
    </View>
    <View style = {styles.root}>
      <TouchableOpacity 
        style = {styles.signUpButton}
        onPress = {()=> navigation.navigate('Sign Up')}>
          <Text style = {styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default LogInScreen

const styles = StyleSheet.create ({
  logInScreenStyle: {
    backgroundColor: appBackgroundColor,
    height: '100vh'
  } , 
  root: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: appBackgroundColor,
    },
    logo: {
        width: '70%', 
        maxWidth: 400,
        maxHeight: 250,
        margin: 50,
    },
    input: {
      width: 300,
      height: 40,
      backgroundColor: appBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: appButtonColor,
      borderBottomWidth: 3,
      fontSize: 16,
      margin: 15,
      color: appTextColor,
      fontFamily: appFont,
      outlineStyle: 'none'
    },
    signUpButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: appButtonColor,
      color: appTextColor,
      width: 75,
      height: 30,
      borderRadius: 2,
      fontFamily: appFont,
      fontSize: 16,
      shadowColor: '#5A5A5A',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 10
    },
    styleOfText: {
      marginTop: '12.5%',
      fontFamily: appFont,
      fontSize: 16,
      color: appButtonColor
    },
    logInButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: appButtonColor,
      color: appTextColor,
      width: 75,
      height: 30,
      borderRadius: 2,
      fontFamily: appFont,
      fontSize: 16,
      margin: 20,
      shadowColor: '#5A5A5A',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 10
    },
    buttonText: {
      fontFamily: appFont
    }
})