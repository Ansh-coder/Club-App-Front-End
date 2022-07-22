import { StyleSheet, Text, TextInput, Button,  View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import NextFunctionForApp from '../../src/screens/NextFunctionForApp';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";

const TxtInputforLogIn  = () => {

  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const {width} = useWindowDimensions();
  const {height} = useWindowDimensions();

  return (
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
        onPress = {NextFunctionForApp}>
          <Text>LOG IN</Text>
      </TouchableOpacity>
    
    </SafeAreaView>

  )
}

const styles = StyleSheet.create ({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fffde4',
  },
  logo: {
      width: '70%', 
      maxWidth: 400,
      maxHeight: 250,
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

export default TxtInputforLogIn

