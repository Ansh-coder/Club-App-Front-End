import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { object } from 'prop-types'
import { useState } from 'react'

function DashboardScreen () {
  var JWT = getToken()
  var clubs
  var clubJson
  var data
  var ClubCardComponent

  JWT.then(async token => {
    clubs = await fetch('http://localhost:3000/clubs', {
      headers: {
        Authorization: 'jwt ' + token
      }
    })
    clubJson = await clubs.json()
      console.log(clubJson)
      console.log(clubs)

      data = clubJson.map(function(club) {
        return {
          key: club._id,
          name: club.name
      };
    });
      console.log(data)
      console.log(data[0].name)
  })

  return(
    <View>DashboardScreen</View>
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