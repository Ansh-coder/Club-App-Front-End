import { StyleSheet, Text, TextInput, Button,  View, SafeAreaView, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import NextFunctionForApp from '../../src/screens/NextFunctionForApp';

const TxtInputforLogIn  = () => {

  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  const {width} = useWindowDimensions();
  const {height} = useWindowDimensions();

  return (
    <SafeAreaView style = {styles.root}>
      <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Your Email"
        placeholderTextColor = '#708cbc'
      />
      <TextInput
        style={styles.input}
        secureTextEntry = {true}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Your Password"
        placeholderTextColor = '#708cbc'
      />
      <Button
        onPress = {NextFunctionForApp}
        title = 'Log In'
        color = '#5feaf8'
        accessibilityLabel="Press this button to log in to the app"
        type = 'submit'
      />
    </>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create ({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#440bd4',
    top: 75
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

export default TxtInputforLogIn

