import React from 'react'
import { useWindowDimensions, Image, View, StyleSheet, SafeAreaView } from 'react-native'
import Logo from '../../assets/favicon.png';
import TextInputField from '../components/TextInputField';
import { appBackgroundColor} from '../UniversalAppDesignVars';


const SignInScreen = () => {
  const {height} = useWindowDimensions();

  return (
    <SafeAreaView style = {styles.base}>
      <View style = {styles.root}>
        <Image source = {Logo} style = {[styles.logo, {height: height*0.2}]} resizeMode = "contain"/>
        <TextInputField/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
    base: {
      backgroundColor: appBackgroundColor,
      height: '100%'
    },
    root: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: appBackgroundColor
    },
    logo: {
        margin: 50,
        width: '70%', 
        maxWidth: 400,
        maxHeight: 250,
    },
})

export default SignInScreen