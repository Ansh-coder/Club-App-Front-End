 import { View, SafeAreaView, Text, StyleSheet, TextInput, useWindowDimensions, Button, TouchableOpacity} from 'react-native'
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
        placeholderTextColor = '#D5B877'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangelastName}
        value={lastName}
        placeholder="Your Last Name"
        placeholderTextColor = '#D5B877'
      />
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
      <TextInput
        style={styles.input}
        secureTextEntry = {true}
        onChangeText={onChangeReEnterPassword}
        value={reenterpassword}
        placeholder="Re-enter Password"
        placeholderTextColor = '#D5B877'
      />

      <TouchableOpacity 
        style = {styles.signUpButton}
        onPress = {NextFunctionForApp}
        disabled = {!firstName || !lastName || !email || !password || !reenterpassword || password !== reenterpassword }>
          <Text>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </> 
   )
 }
 
const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fffde4'
    },
    input: {
      width: 300,
      height: 40,
      backgroundColor: '#fffde4',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#644614',
      borderBottomWidth: 3,
      borderRadius: 3, 
      fontSize: 16,
      margin: 10,
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
})

 export default TextInputField