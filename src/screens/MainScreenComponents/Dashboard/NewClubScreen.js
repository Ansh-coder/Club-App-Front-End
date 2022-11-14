import { StyleSheet, Text, TouchableOpacity, TextInput, SafeAreaView, Switch } from 'react-native'
import React from 'react'
import "react-widgets/styles.css"
import DropdownList from "react-widgets/DropdownList";
import { Multiselect } from 'react-widgets';
import { appBackgroundColor, appButtonColor, appTextColor, appFont } from '../../../UniversalAppDesignVars'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode';
import {
  NavigationContainer,
  CommonActions,
} from '@react-navigation/native';

export const NewClubScreen = ({navigation}) => {
    const [clubName, onChangeClubName] = React.useState("")
    const [clubDescription, onChangeClubDescription] = React.useState("")
    const [clubCategory, onChangeClubCategory] = React.useState("")
    const [clubFee, onChangeClubFee] = React.useState("")
    const [clubInterestMeeting, onChangeClubInterestMeeting] = React.useState(false)
    const clubCategoryTypes = ["Math", "Science", "Sports", "English", "Student Associations", "Other"]

    const interestMeetingToggled = () => onChangeClubInterestMeeting(previousState => !previousState);

    var token
    var advisorId;

    const fetchToken = async () => {
      token = await AsyncStorage.getItem('token');
      console.log(token)

      return token
    }

    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const token = await fetchToken()
      console.log(token)
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'jwt ' + token
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript
    }

    const fetchAdvisorId = async () => {
      const token = await fetchToken()
      var advisorData = jwtDecode(token)
      console.log(advisorData)
      advisorId = advisorData.id
      console.log(advisorId);

      return advisorId
    }
    
  const onSendRequest = async () => {
    console.log("Request Sent")
    console.log(clubName)
    console.log(clubDescription)
    console.log(clubCategory)
    console.log(clubFee)
    console.log(clubInterestMeeting)

    var advisorId = await fetchAdvisorId()
    var name = clubName
    var description = clubDescription
    var category = clubCategory
    var fee = clubFee
    var interestMeetingRequired = clubInterestMeeting

    postData('http://localhost:3000/clubs', {name, description, category, fee, interestMeetingRequired, advisorId})
      .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      }).catch(error => console.log(error));

        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'New Club Screen',
              },
              { name: 'Dashboard' },
            ],
          })
        )

  }

    return(
    <SafeAreaView style = {styles.root}>
        <Text style = {styles.fieldName}>Club Name</Text>
        <TextInput
          style={styles.clubName}
          onChangeText={onChangeClubName}
          value={clubName}
          placeholder="What's your new club's name?"
          placeholderTextColor = {appTextColor}
        />
        <Text style = {styles.fieldName}>Club Description</Text>
        <TextInput
          style={styles.clubDescription}
          multiline={true}
          onChangeText={onChangeClubDescription}
          value={clubDescription}
          placeholder="Write a short description of your club."
          placeholderTextColor = {appTextColor}
          right = {clubDescription.length}
          maxLength = {500}
        />
        <Text style = {styles.fieldName}>Club Category</Text>
        <Multiselect
          style = {styles.dropdownStyle}
          placeholder="Select a category"
          data={clubCategoryTypes}
          onChange = {onChangeClubCategory}
        />
        <Text style = {styles.fieldName}>Club Fee</Text>
        <TextInput
          style={styles.clubName}
          onChangeText={onChangeClubFee}
          value={clubFee}
          placeholder="What's the fee for joining your club?"
          placeholderTextColor = {appTextColor}
          keyboardType='decimal-pad'
        />
        <Text style = {styles.fieldName}>Interest Meeting Required </Text>
        <Switch
          trackColor={{ false: appTextColor, true: appButtonColor }}
          thumbColor={clubInterestMeeting ? appBackgroundColor : appTextColor}
          ios_backgroundColor = {appTextColor}
          onValueChange={interestMeetingToggled}
          value={clubInterestMeeting}
          style = {styles.toggle}
        />
        <TouchableOpacity 
          onPress = {onSendRequest}
          disabled = {clubName == "" || clubFee == "" || clubDescription == "" || clubCategory == ""}
          style={clubName == "" || clubFee == "" || clubDescription == "" || clubCategory == "" ? styles.disabledSendRequestButton : styles.sendRequestButton}>
            <Text style = {styles.buttonText}>Create Club</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    root: {
      alignItems: 'left',
      padding: 20,
      backgroundColor: appBackgroundColor,
      height: '100%'
    },
    toggle: {
      margin: 15,
      flexDirection: 'row',
    },
    buttonText: {
      fontFamily: appFont
    },
    dropdownStyle: {
      width: '75%',
      height: 40,
      backgroundColor: appBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: appButtonColor,
      borderBottomWidth: 3,
      fontSize: 16,
      marginTop: 5,
      marginBottom: 15,
      marginLeft: 15,
      color: appTextColor,
      fontFamily: appFont,
    },
    logo: {
        width: '70%', 
        maxWidth: 400,
        maxHeight: 250,
        margin: 50,
    },
    clubName: {
      width: '50%',
      height: 40,
      backgroundColor: appBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: appButtonColor,
      borderBottomWidth: 3,
      fontSize: 16,
      marginTop: 5,
      marginBottom: 15,
      marginLeft: 15,
      color: appTextColor,
      fontFamily: appFont,
    },
    clubDescription: {
      width: '75%',
      height: 200,
      marginTop: 5,
      marginBottom: 15,
      marginLeft: 15,
      backgroundColor: appBackgroundColor,
      fontSize: 16,
      color: appTextColor,
      fontFamily: appFont,
      borderColor: appButtonColor,
      borderWidth: 2,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    fieldName: {
      backgroundColor: appBackgroundColor,
      color: appTextColor,
      fontFamily: appFont,
      marginTop: 20,
      marginLeft: 20,
      fontWeight: "900",
      fontSize: 20,
      textDecorationLine: 'underline',
      flexWrap: 'wrap'
    },
    interestMeetingFieldName: {
      backgroundColor: appBackgroundColor,
      color: appTextColor,
      fontFamily: appFont,
      marginTop: 20,
      marginLeft: 20,
      fontWeight: "900",
      fontSize: 20,
      textDecorationLine: 'underline',
      flexDirection: 'row',
      flexWrap: 'wrap'
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
      fontSize: 16
    },
    styleOfText: {
      marginTop: '12.5%',
      fontFamily: appFont,
      fontSize: 16,
      color: appButtonColor
    },
    sendRequestButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: appButtonColor,
      color: "#AAAFB4",
      height: 30,
      borderRadius: 2,
      fontFamily: appFont,
      fontSize: 16,
      margin: 20,
      shadowColor: '#5A5A5A',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 15,
    },
    disabledSendRequestButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#D3D3D3',
      color: "#5A5A5A",
      height: 30,
      borderRadius: 2,
      fontFamily: appFont,
      fontSize: 16,
      margin: 20,
      shadowColor: '#5A5A5A',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 17,
    },
})