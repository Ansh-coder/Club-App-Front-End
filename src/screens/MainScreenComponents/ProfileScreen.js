import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen () {
    const load = async () => {
        const token = await AsyncStorage.getItem('token');
        const usersJson = await fetch('http://localhost:3000/users', {
            headers: {
                Authorization: 'jwt ' + token
            }
        })
        console.log('hello')
        return usersJson.json()
    }
    load()
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})