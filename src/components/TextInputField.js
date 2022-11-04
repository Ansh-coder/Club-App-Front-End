import { SafeAreaView, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from "react";
import { appBackgroundColor, appButtonColor, appTextColor, appFont } from '../UniversalAppDesignVars';

const TextInputField = () => {
 var [firstName, onChangefirstName] = React.useState([]);
 var [lastName, onChangelastName] = React.useState([]);
 var [email, onChangeEmail] = React.useState([]);
 var [password, onChangePassword] = React.useState([]);
 var [reenterpassword, onChangeReEnterPassword] = React.useState([]);

 const [disable, setDisable] = React.useState(false);

 const {width} = useWindowDimensions();
 const {height} = useWindowDimensions();

 async function postData(url = '', data = {}) {
   // Default options are marked with *
   const response = await fetch(url, {
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     headers: {
       'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     redirect: 'follow', // manual, *follow, error
     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     body: JSON.stringify(data) // body data type must match "Content-Type" header
   });
   return response.json(); // parses JSON response into native JavaScript
   }
 const onSubmit = () => {
   console.log('submit')
   console.log(firstName)
   console.log(lastName)
   console.log(email)
   console.log(password)
   console.log(reenterpassword)

   postData('http://localhost:3000/users', { firstName, lastName, email, password })
       .then((data) => {
           console.log(data); // JSON data parsed by `data.json()` call
   }).catch(error => console.log(error));
 }
  return (
   <SafeAreaView style = {styles.root}>
     <TextInput
       style={styles.input}
       onChangeText={onChangefirstName}
       value={firstName}
       placeholder="Your First Name"
       placeholderTextColor = {appTextColor}
     />
     <TextInput
       style={styles.input}
       onChangeText={onChangelastName}
       value={lastName}
       placeholder="Your Last Name"
       placeholderTextColor = {appTextColor}
     />
     <TextInput
       style={styles.input}
       onChangeText={onChangeEmail}
       value={email}
       placeholder="Your Email"
       placeholderTextColor = {appTextColor}
     />
     <TextInput
       style={styles.input}
       secureTextEntry = {true}
       onChangeText={onChangePassword}
       value={password}
       placeholder="Your Password"
       placeholderTextColor = {appTextColor}
     />
     <TextInput
       style={styles.input}
       secureTextEntry = {true}
       onChangeText={onChangeReEnterPassword}
       value={reenterpassword}
       placeholder="Re-enter Password"
       placeholderTextColor = {appTextColor}
     />
     <TouchableOpacity 
       style = {styles.signUpButton}
       onPress = {onSubmit}
       disabled = {!firstName || !lastName || !email || !password || !reenterpassword || password !== reenterpassword }>
         <Text style = {styles.buttonText}>SIGN UP</Text>
     </TouchableOpacity>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   root: {
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: appBackgroundColor,
     height: '100%'
   },
   buttonText: {
    fontFamily: appFont
   },
   input: {
     width: 300,
     height: 40,
     backgroundColor: appBackgroundColor,
     paddingVertical: 10,
     paddingHorizontal: 15,
     borderColor: appButtonColor,
     borderBottomWidth: 3,
     fontSize: 16,
     margin: 10,
     color: appTextColor,
     fontFamily: appFont
   },
   signUpButton: {
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: appButtonColor,
     color: appTextColor,
     width: 75,
     height: 30,
     borderRadius: 2,
     fontFamily: appFont,
     fontSize: 16,
     margin: 20,
     shadowColor: '#5A5A5A',
     shadowOffset: {width: 0, height: 0},
     shadowRadius: 10
   },
   styleOfText: {
    marginTop: '12.5%',
    fontFamily: appFont,
    fontSize: 16,
    color: appButtonColor
  }
})

export default TextInputField