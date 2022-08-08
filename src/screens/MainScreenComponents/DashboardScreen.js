import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function DashboardScreen () {
  var JWT = getToken()

  JWT.then(async token => {
    const login = await fetch('http://localhost:3000/clubs', {
      headers: {
        Authorization: 'jwt ' + token
      }
    })
      console.log(await login.json())
  })

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

async function getToken () {
    return await AsyncStorage.getItem('token');
    
}

export default DashboardScreen

const styles = StyleSheet.create({})