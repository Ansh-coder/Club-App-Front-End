 import { View, SafeAreaView, Text, StyleSheet, TextInput, useWindowDimensions} from 'react-native'
 import React from 'react'
 
 const TextInputField = () => {
  const [firstName, onChangefirstName] = React.useState(null);
  const [lastName, onChangelastName] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [reenterpassword, onChangeReEnterPassword] = React.useState(null);

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
      color: '#5feaf8'
    } 
})

 export default TextInputField