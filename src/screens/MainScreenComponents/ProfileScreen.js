import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import jwt_decode from "jwt-decode";

export const ProfileScreen = () => {
//var [email, onChangeEmail] = React.useState(user.email);

  const {isLoading, user} = loadData();
  var [email, onChangeEmail] = React.useState(user.email);
  var [password, onChangePassword] = React.useState(user.email);
  if (isLoading) return <Text>Loading...</Text>
//  var [email, onChangeEmail] = React.useState(user.email);
console.log(user.email)
console.log(email)
  return <View>
    <TextInput
    style={styles.input}
    onChangeText={onChangeEmail}
    value={email}
    placeholderTextColor = '#D5B877'
    />
    <TextInput
    style={styles.input}
    secureTextEntry = {true}
    onChangeText={onChangePassword}
    value={password}
    placeholderTextColor = '#D5B877'
    />
  </View>
}
function loadData() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState([])
  const load = async () => {
      const token = await AsyncStorage.getItem('token');
      var decoded = jwt_decode(token);
      console.log(decoded)
      console.log(decoded.id)
      const usersJson = await fetch('http://localhost:3000/users/'+decoded.id, {
          headers: {
              Authorization: 'jwt ' + token
          }
      })
      return usersJson.json()
  }

  useEffect(() => {
      setIsLoading(true)

      load()
          .then((user) => {
              console.log(user);
              setUser(user)
              setIsLoading(false)
          })
          .catch((err) => {
              console.log(err)
              return setIsLoading(false)
          })
  }, [])

  return {isLoading, user}
}

const styles = StyleSheet.create({
  card: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: '#fffde4',
      borderColor: '#000000',
      borderWidth: 3,
      borderRadius: 10,
      margin: 20
  },input: {
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
    fontFamily: 'Futura'}
  });

export default ProfileScreen
