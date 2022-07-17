import React from 'react'
import { useWindowDimensions, Image, View, Text, StyleSheet } from 'react-native'
import Logo from '../../assets/favicon.png';
import TextInputField from '../components/TextInputField';


const SignInScreen = () => {
  const {height} = useWindowDimensions();

  return (
    <>
    <View style = {styles.root}>
    <Image source = {Logo} style = {[styles.logo, {height: height*0.2}]} resizeMode = "contain"/>
  </View>
  <View>
    <TextInputField/>
  </View>
  <View>
  </View>
  </>

    
  )
}

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
})

export default SignInScreen

