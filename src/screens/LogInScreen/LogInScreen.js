import { StyleSheet, Text, TextInput, Button,  View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/favicon.png';
import React from 'react'
import MainScreen from '../MainScreen';
import SignInScreen from '../SignInScreen';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


function LogInScreen ( {navigation}) {

var [email, onChangeEmail] = React.useState('advisor9@user.com');
var [password, onChangePassword] = React.useState('advisoristhebest9');

const {width} = useWindowDimensions();
const {height} = useWindowDimensions();

const onSubmit = async () => {
  console.log('submit')
  console.log(email)
  console.log(password)
    const login = await fetch(`http://localhost:3000/users/login?email=${email}&password=${password}`)

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
    <>
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
          <Text>LOG IN</Text>
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
          <Text>SIGN UP</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default LogInScreen

const styles = StyleSheet.create ({
    root: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fffde4'
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
      backgroundColor: '#fffde4',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#644614',
      borderBottomWidth: 3,
      fontSize: 16,
      margin: 15,
      color: '#000000',
      fontFamily: 'Futura'
    },
    signUpButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#CD8B49',
      color: "#FFFFFF",
      width: 75,
      height: 30,
      borderRadius: 2,
      fontFamily: 'Futura',
      fontSize: 16
    },
    styleOfText: {
      marginTop: '12.5%',
      fontFamily: 'Futura',
      fontSize: 16,
      color: '#CD8B49'
    },
    logInButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#CD8B49',
      color: "#FFFFFF",
      width: 75,
      height: 30,
      borderRadius: 2,
      fontFamily: 'Futura',
      fontSize: 16,
      margin: 20
    },
})