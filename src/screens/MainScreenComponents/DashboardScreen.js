import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function DashboardScreen () {
  var JWT = getToken()
  var clubs


  JWT.then(async token => {
    clubs = await fetch('http://localhost:3000/clubs', {
      headers: {
        Authorization: 'jwt ' + token
      }
    })
      console.log(await clubs.json())
      console.log(clubs)
  })
  const results = [];

  for (const club of clubs.json()) {
    results.push(
      <div key={club._id}>
        <Text>name: {club.name}</Text>
        <Text>description: {club.description}</Text>
        <hr/>
      </div>,
    );
  }

  return (
    <View>
       <div>{results}</div>
    </View>
  )
}


async function getToken () {
    return await AsyncStorage.getItem('token');
    
}

export default DashboardScreen

const styles = StyleSheet.create({    
    card: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffde4',
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 10,
        margin: 20
    }
})