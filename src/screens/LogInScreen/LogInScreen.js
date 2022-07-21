import { StyleSheet, Text, TextInput, Button,  View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import Logo from '../../../assets/favicon.png';
import React from 'react'
import NextFunctionForApp from '../NextFunctionForApp';
import TxtInputforLogIn from '../../components/TxtInputforLogIn';
import SignInScreen from '../SignInScreen';


function LogInScreen ( {navigation}) {
const {height} = useWindowDimensions();

  return (
    <>
    <View style = {styles.root}>
        <Image source = {Logo} style = {[styles.logo, {height: height*0.2}]} resizeMode = "contain"/>
    </View>
    <View>
      <TxtInputforLogIn/>
    </View>
    <View style = {styles.root}>
      <Text style = {styles.styleOfText}>Don't have an account?</Text>
    </View>
    <View style = {styles.root}>
      <TouchableOpacity 
        style = {styles.signUpButton}
        onPress = {()=> navigation.navigate('SignIn')}>
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
        margin: 20
    },
    input: {
      width: 300,
      height: 40,
      backgroundColor: '#000000',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#5feaf8',
      borderWidth: 1,
      borderRadius: 15, 
      fontSize: 16,
      margin: 10,
      color: '#5feaf8',
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
      marginTop: 50,
      fontFamily: 'Futura',
      fontSize: 16,
      color: '#CD8B49'
    }
})