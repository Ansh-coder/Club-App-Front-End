import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'

export const ProfileScreen = () => {

  const {isLoading, users} = loadData();
  if (isLoading) return <Text>Loading...</Text>

  return <View>
      {users.map(user => {
        console.log(user._id)
        console.log(user.firstName)
          return (
            <View key={user._id}>
                <Text>{user.firstName}</Text>
            </View>
          );
      })}
  </View>
}
function loadData() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setusers] = useState([])
  
  const load = async () => {
      const token = await AsyncStorage.getItem('token');
      const usersJson = await fetch('http://localhost:3000/users/login/', {
          headers: {
              Authorization: 'jwt ' + token
          }
      })
      return usersJson.json()
  }
  useEffect(() => {
      setIsLoading(true)
      load()
          .then((users) => {
              console.log(users);
              setusers(users)
              setIsLoading(false)
          })
          .catch((err) => {
              console.log(err)
              return setIsLoading(false)
          })
  }, [])
  return {isLoading, users}
}
const styles = StyleSheet.create({
  card: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFDE4',
      borderColor: '#000000',
      borderWidth: 3,
      borderRadius: 10,
      margin: 20
  },input: {
    width: 300,
    height: 40,
    backgroundColor: '#FFFDE4',
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