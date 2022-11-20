import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Button, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appBackgroundColor, appButtonColor, appTextColor, appFont } from '../../../UniversalAppDesignVars'
import EditInfoComponent from '../../../components/EditInfoComponent'
import { Multiselect } from 'react-widgets'
import { Switch } from 'react-native-gesture-handler'

export const AdvisorClubView = ({route, navigation}) => {
   /* var clubMembershipData = clubMembershipData.route.params.clubMembershipData
    console.log(clubMembershipData)
    console.log(clubData)*/
    var titleArrayTest = ['Name', 'Description', 'Contents']
    var titleArrayContent = ['Coding', 'Coding is cool', '12345']
    var backEndFunction = "PUT";
    var backEndParameters = ["name", "description", "advisorId", "category", "fee", "interestMeetingRequired"]
    const {clubMembershipData} = route.params
    const {clubData} = route.params

    const [clubName, onChangeClubName] = React.useState(clubData.name)
    const [clubDescription, onChangeClubDescription] = React.useState(clubData.description)
    const [clubCategory, onChangeClubCategory] = React.useState(clubData.category)
    const [clubFee, onChangeClubFee] = React.useState(clubData.fee.$numberDecimal)
    const [clubInterestMeeting, onChangeClubInterestMeeting] = React.useState(clubData.interestMeetingRequired)
    const clubCategoryTypes = ["Math", "Science", "Sports", "English", "Student Associations", "Other"]
    const clubId = clubData._id

    const interestMeetingToggled = () => onChangeClubInterestMeeting(previousState => !previousState);

    console.log(clubName, clubDescription, clubCategory, clubFee, clubInterestMeeting)
    console.log(clubMembershipData)
    console.log(clubData)
    async function putData(url = '', data = {}) {
        // Default options are marked with *
        const token = await AsyncStorage.getItem('token')
        console.log('jwt' + token)
        const response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'jwt ' + token
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript
    }

    var noOfTimesRun = 1;

    const onSendRequest = async () => {
        console.log("Request Sent")
        console.log(clubName)
        console.log(clubDescription)
        console.log(clubCategory)
        console.log(clubFee)
        console.log(clubInterestMeeting)

        putData(`${AppConfig.apiUrl}/clubs/` + clubId, { name: clubName, description: clubDescription, category: clubCategory, fee: clubFee, interestMeetingRequired: clubInterestMeeting })
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
        }).catch(error => console.log(error));

        console.log(noOfTimesRun)
        noOfTimesRun++;
    }

    return <SafeAreaView style = {styles.root}>
                  <TouchableOpacity
              style={styles.editClubButton}
              onPress={() => 
                {
                navigation.navigate("Edit Club Screen", {
                    clubData: clubData
                })
                }}>
              <Text style = {styles.buttonText}>Edit Club</Text>
            </TouchableOpacity>
            {clubMembershipData.map(club => {
                
                var isInterestMeetingAttended;
                var isFeePaid;

                const onApprove = () => {
                    console.log('Approved!')
                    putData(`${AppConfig.apiUrl}/memberships/` + club._id, { registered: true, isDeleted: false })
                        .then((data) => {
                            console.log(data); // JSON data parsed by `data.json()` call
                    }).catch(error => console.log(error));
                    
                }

                const onReject = () => {
                    console.log('Rejected.')
                    
                    putData(`${AppConfig.apiUrl}/memberships/` + club._id, { isDeleted: true })
                        .then((data) => {
                            console.log(data); // JSON data parsed by `data.json()` call
                    }).catch(error => console.log(error));
                    
                }

                if (club.interestMeetingAttended) { isInterestMeetingAttended = "Interest Meeting Attended" } else { isInterestMeetingAttended = "Interest Meeting Not Attended Yet"}
                if (club.paid) { isFeePaid = "Fee Paid" } else { isFeePaid = "Fee Is Not Paid Yet"}
            
            if( club.registered == false && club.isDeleted == false ) {
                return (
                    <ScrollView key={club._id} contentContainerStyle = {styles.base}>
                    <View key={club._id} style={styles.card}>
                         <Text style={styles.clubName2}>{club.userFirstName}, {club.userLastName}</Text>
                        <Text style={styles.clubDescription2}>{isInterestMeetingAttended}</Text>
                        <Text style={styles.clubDescription2}>{isFeePaid}</Text>
                        <TouchableOpacity
                            style={styles.approveButton}
                            onPress={onApprove}>
                            <Text style = {styles.buttonText}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rejectButton}
                            onPress={onReject}>
                            <Text style = {styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                )
                }
            })}
        </SafeAreaView>
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: appBackgroundColor,
        height: '100%',
        marginBottom: '30%'
    },
    root2: {
        backgroundColor: appBackgroundColor,
        height: '100%'
    },
    base: {
        justifyContent: 'center',
        backgroundColor: appBackgroundColor
    },
    buttonText: {
        fontFamily: appFont
    },
    card: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: appTextColor,
        borderRadius: 10,
        margin: '3%',
        marginTop: 30,
        width: '80%',
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
    },
    clubName2: {
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: '800',
        width: '25%',
        textShadowColor: 'grey', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        fontFamily: appFont,
        flexWrap: 'wrap'
    },
    clubDescription2: {
        margin: 10,
        color: appBackgroundColor,
        fontFamily: appFont
    },
    interestMeetingStyle: {
        marginTop: 20,
        marginHorizontal: 10,
        color: 'red',
        fontWeight: '600'
    },
    joinClubButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    approveButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#8fbc8f',
        color: appTextColor,
        height: 30,
        width: 75,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 10,
        marginTop: 15,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
    },
    rejectButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#D2686E',
        color: appTextColor,
        height: 30,
        width: 75,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 10,
        marginBottom: 15,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 17,
    },
    createNewClubButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 75,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16
    },
    advisorName: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10
    },
    registrationRequests: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10
    },
    advisorFunctionTest: {
        color: 'red',
        fontWeight: '600'
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
        flexWrap: 'wrap'
      },
      bigFieldName: {
        backgroundColor: appBackgroundColor,
        color: appTextColor,
        fontFamily: appFont,
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "900",
        fontSize: 30,
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
        flexDirection: 'row',
        flexWrap: 'wrap'
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
      toggle: {
        margin: 15,
        flexDirection: 'row',
      },
      editClubButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 75,
        marginLeft: '10%',
        marginTop: 30,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
      },
      approveAllButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 75,
        marginLeft: '10%',
        marginTop: '5%',
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
      },
      rejectAllButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 75,
        marginLeft: '10%',
        marginTop: '5%',
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
      }
});