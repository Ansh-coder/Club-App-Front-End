import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function DashboardScreen () {
  var JWT = getToken()
  var clubs
  var clubData = [
      {
          id: '1',
          name: 'chess club',
          description: 'good club',
          interestMeetingRequired: true,
          fee: '$12.00'
      },
      {
        id: '2',
        name: 'math club',
        description: 'excellent club',
        interestMeetingRequired: false,
        fee: '$10.00'
      },
      {
        id: '3',
        name: 'music club',
        description: 'very good club',
        interestMeetingRequired: true,
        fee: '$5.00'
      }
  ]

  JWT.then(async token => {
    clubs = await fetch('http://localhost:3000/clubs', {
      headers: {
        Authorization: 'jwt ' + token
      }
    })
      console.log(await clubs.json())
      console.log(clubs)
      console.log(clubData.length)
  })

 function RenderClubCards () {
    for (var i = 0; i < clubData.length; i++) {
        ClubAppComponent(i)
        console.log(i)
    }
}


function ClubAppComponent (number) {
    console.log(number)

    var clubName = clubData[number].name
    var clubDesc = clubData[number].description
    var clubFee = clubData[number].fee
    var clubMeeting 
    if (clubData[number].interestMeetingRequired === true) {
          clubMeeting = 'Interest Meeting Required'
    } else {
          clubMeeting = null
    }
    console.log(clubName)
    console.log(clubDesc)
    console.log(clubFee)
    console.log(clubMeeting)
    
    return(
        <SafeAreaView style = {styles.card}>
              <Text>{clubName}</Text>
              <Text>{clubDesc}</Text>
              <Text>{clubFee}</Text>
              <Text>{clubMeeting}</Text>
        </SafeAreaView>
    )
}

/*function ClubAppComponent () {
  for(var number = 0; number < clubData.length; number++) {
  console.log(number)

  var clubName = clubData[number].name
  var clubDesc = clubData[number].description
  var clubFee = clubData[number].fee
  var clubMeeting 
  if (clubData[number].interestMeetingRequired === true) {
        clubMeeting = 'Interest Meeting Required'
  } else {
        clubMeeting = null
  }
  console.log(clubName)
  console.log(clubDesc)
  console.log(clubFee)
  console.log(clubMeeting)
  
  return(
      <SafeAreaView style = {styles.card}>
            <Text>{clubName}</Text>
            <Text>{clubDesc}</Text>
            <Text>{clubFee}</Text>
            <Text>{clubMeeting}</Text>
      </SafeAreaView>
  )
  }
}*/
/*
function ClubAppComponent (number) {
  var clubName
  var clubDesc
  var clubFee
  clubName[number]= clubData[number].name
  clubDesc[number]= clubData[number].description
  clubFee[number]= clubData[number].fee
  return(
      <SafeAreaView style = {styles.card}>
            <Text>{clubName[number]}</Text>
            <Text>{clubDesc[number]}</Text>
            <Text>{clubFee[number]}</Text>
      </SafeAreaView>
  )
}*/



  
  return (
    <View>
        <RenderClubCards/>
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