 import { View, SafeAreaView, Text, StyleSheet, TextInput, useWindowDimensions, Button} from 'react-native'
 import React, { useState } from "react";
 import NextFunctionForApp from '../screens/NextFunctionForApp';
 
 const TextInputField = () => {
  const [firstName, onChangefirstName] = React.useState(null);
  const [lastName, onChangelastName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [reenterpassword, onChangeReEnterPassword] = React.useState(null);

  const [disable, setDisable] = React.useState(false);

  const {width} = useWindowDimensions();
  const {height} = useWindowDimensions();

   return (
    <>
    <SafeAreaView style = {styles.root}>
      <TextInput
        style={styles.input}
        onChangeText={onChangefirstName}
        value={firstName}
        placeholder="Your First Name"
        placeholderTextColor = '#708cbc'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangelastName}
        value={lastName}
        placeholder="Your Last Name"
        placeholderTextColor = '#708cbc'
      />
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
      <TextInput
        style={styles.input}
        secureTextEntry = {true}
        onChangeText={onChangeReEnterPassword}
        value={reenterpassword}
        placeholder="Re-enter Password"
        placeholderTextColor = '#708cbc'
      />
      <Button
        onPress = {NextFunctionForApp}
        title = 'Sign Up'
        color = '#5feaf8'
        accessibilityLabel="Press this button to sign up with your given information"
        type = 'submit'
        disabled={!firstName || !lastName || !email || !password || !reenterpassword || password !== reenterpassword}
      />
    </SafeAreaView>
    </> 
   )
 }
 
const styles = StyleSheet.create({
    root: {
      top: 75,
      alignItems: 'center',
      justifyContent: 'center'
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

 export default TextInputField