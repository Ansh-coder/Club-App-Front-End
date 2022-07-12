import { StyleSheet, Text, TextInput, Button,  View, SafeAreaView, Image, useWindowDimensions } from 'react-native'
import Logo from '../../../assets/favicon.png';
import React from 'react'
import NextFunctionForApp from '../NextFunctionForApp';
import TxtInputforLogIn from '../../components/TxtInputforLogIn';

const LogInScreen = () => {
const {height} = useWindowDimensions();

  return (
    <>
    <View style = {styles.root}>
        <Image source = {Logo} style = {[styles.logo, {height: height*0.2}]} resizeMode = "contain"/>
    </View>
    <View>
      <TxtInputforLogIn/>
    </View>
    </>
  )
}

export default LogInScreen

const styles = StyleSheet.create ({
    root: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#440bd4'
    },
    logo: {
        width: '70%', 
        maxWidth: 400,
        maxHeight: 250,
        top: 50,
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
    }
})