import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appBackgroundColor, appButtonColor, appTextColor, appFont } from '../../../UniversalAppDesignVars'
import { ClubService } from '../../../services/club.service'
import { UserService } from '../../../services/user.service'
import { MembershipService } from '../../../services/membership.service'
import jwtDecode from 'jwt-decode'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { now } from 'lodash'
import { Multiselect } from 'react-widgets'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Popup from 'reactjs-popup'

export const JoinClubScreen = () => {
const {isLoading, clubs, userId, user, userType, advisorClubs, clubMembershipRequests, userMemberships} = loadData();
const clubCategoryTypes = ["Math", "Science", "Sports", "English", "Student Associations", "Other"]
console.log(clubs)
console.log(userMemberships)
var userClubIds = userMemberships.map(membership => membership.clubId)
console.log(userClubIds)
var whichClubMembership = 0;
var token

const [searchQuery, onChangeSearchQuery] = React.useState('')
const [clubCategory, onChangeClubCategory] = React.useState([])
const [clubFee, onChangeClubFee] = React.useState('')
const [clubInterestMeeting, onChangeClubInterestMeeting] = React.useState('')

const fetchToken = async () => {
    token = await AsyncStorage.getItem('token');
    console.log(token)

    return token
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const token = await fetchToken()
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

const onFiltersClick = () => {
    console.log('I clicked it.')
}

var officiallyRegisteredClubs

  return (
    <View style = {styles.dashboardScreenStyle}>
        <View style = {styles.searchFieldOverStyle}>
            <TextInput
                style={styles.searchDesign}
                onChangeText={onChangeSearchQuery}
                value={searchQuery}
                placeholder="Search a club..."
                placeholderTextColor = {appTextColor}
            />
            <Popup 
            trigger = {
                <TouchableOpacity>
                    <Ionicons
                    name="filter"
                    size = {25}
                    color = {appButtonColor}
                    style = {styles.clickImageStyle}
                    />
                </TouchableOpacity>
            }
            position = 'center center'
            >
                <Text style = {styles.buttonText}>Popup worked!</Text>
            </Popup>

        </View>
      {clubs.map(club => {
        var isRegistrationRequestSent = false;
        var regStatus
        var InterestMeeting
        var whichClub = 0;
        var clubIndex = null;
        userClubIds.map(userClubId => {
            if(club._id == userClubId) {
                isRegistrationRequestSent = true
                clubIndex = whichClub
                console.log(clubIndex)
            }
            whichClub++;
        })
        console.log("fasfasd"+ clubIndex)
        if (club.interestMeetingRequired === true) {
            InterestMeeting = 'Interest Meeting Required'
        } else {
            InterestMeeting = null
        }
        var clubId = club._id
        var interestMeetingAttended

        if (InterestMeeting === null) {
            interestMeetingAttended = true
        } else {
            interestMeetingAttended = false
        }

        if (club.fee.$numberDecimal === 0) {
            var paid = true
        } else paid = false

        var isRegisteredOrNot = false;
        if(isRegistrationRequestSent == false) {
            isRegisteredOrNot = true
        } else if (userMemberships[clubIndex].registered == false) {
            isRegisteredOrNot = true
        }

        var matchesSearch = false

        console.log(searchQuery.length)
        console.log(searchQuery.substring(0,2))
        var cleanedSearchQuery = searchQuery.toLowerCase().replace(/ /g, '')
        for (let index = 0; index < club.name.length; index++) {
            if(cleanedSearchQuery == club.name.toLowerCase().replace(/ /g, '').substring(index, cleanedSearchQuery.length + index) || cleanedSearchQuery == '')
            {
                matchesSearch = true
            }
        }

        if (isRegistrationRequestSent == true && userMemberships[clubIndex].registered == false) {
            regStatus = "Registration Request Already Sent"
        } else regStatus = null
        console.log(isRegistrationRequestSent)
        var nowMembership = whichClubMembership
        whichClubMembership++;
        console.log(nowMembership)
        const onJoinClub = () => {
            console.log(userId)
            console.log(clubId)

            if(userClubIds.includes(clubId)) {
                console.log("Club Already Registered For")
            } else {
                postData('http://localhost:3000/memberships', {userId, clubId, interestMeetingAttended, paid})
                .then((data) => {
                    console.log(data); // JSON data parsed by `data.json()` call
                }).catch(error => console.log(error));

                userClubIds.push(clubId)
            }
        }
if(isRegisteredOrNot && matchesSearch) {
        return(
                <View key = {club._id} style = {styles.base}>
                    <ScrollView key={club._id} contentContainerStyle={styles.card}>
                        <Text style={styles.clubName}>{club.name}</Text>
                        <Text style={styles.clubDescription}>{club.description}</Text>
                        <Text style={styles.interestMeetingStyle}>{regStatus}</Text>
                        <Text style={styles.interestMeetingStyle}>{InterestMeeting}</Text>
                        <Text style={styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                        <Text style={styles.advisorName}>Advisor: {club.advisorId.firstName} {club.advisorId.lastName}</Text>
                        <TouchableOpacity
                            style={styles.viewClubInfoForAdvisor}
                            onPress={onJoinClub}>
                            <Text style = {styles.buttonText}>Join Club</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
        )}
      })}
    </View>
  )
}

function loadData() {
    const [isLoading, setIsLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const clubService = new ClubService();
    const userService = new UserService();
    const membershipService = new MembershipService();
    const [userId, setUserId] = useState([]);
    const [user, setUser] = useState([]);
    const [userType, setUserType] = useState([]);
    const [clubsUserRegisterdFor, setClubsUserRegisterdFor] = useState([])
    const [advisorClubs, setAdvisorClubs] = useState([])
    const [clubMembershipRequests, setClubMembershipRequests] = useState([])
    const [userMemberships, setUserMemberships] = useState([])

    const fetchUserId = async () => {
        const token = await AsyncStorage.getItem('token')
        var decoded = jwtDecode(token)
        console.log(decoded)

        var userId = decoded.id
        console.log(userId)


        return userId
    }

    const fetchMemberships = async () => {
        const token = await AsyncStorage.getItem('token')
        var decoded = jwtDecode(token)

        var userId = decoded.id
        console.log(userId)

        const userMemberships = await membershipService.getUserMemberships(userId)
        console.log(userMemberships)
        //if (userMemberships === null) {console.log('Club Membership Does Not Exist')} else {console.log('Club Membership Exists')}
        const clubsUserRegisterdFor = userMemberships.map(membership => membership.clubId)
        console.log(clubsUserRegisterdFor)

        return userMemberships
    }

    const fetchData = async () => {
        const clubs = await clubService.list();
        const advisorIds = clubs.map(club => club.advisorId);
        console.log(advisorIds)
        const advisors = await userService.getUsersFromIds(advisorIds);
        

        const hydratedClubs = clubs.map(club => {
            club.advisorId = advisors.find(user => user._id === club.advisorId);
            return club;
        })

        return hydratedClubs
    }

    const fetchUserData = async () => {
        const token = await AsyncStorage.getItem('token')
        var decoded = jwtDecode(token)
        


        var userId = decoded.id
        console.log(userId)

        /* const response = await fetch('http://localhost:3000/users/' + userId, {headers: {
             'Authorization': 'jwt ' + token
         }})

         const userData = await response.json()
         const userType = userData.map(typeofUser => typeofUser.data)

         console.log(userType) */

        const userData = await userService.getUserData(userId)


        console.log(userData)
        console.log(userData.type)
        const userType = userData.type

        return userType
    }

    const fetchAdvisorClubs = async () => {
        const token = await AsyncStorage.getItem('token')
        var decoded = jwtDecode(token)
        console.log(decoded)
        var advisorClubs;

        var userId = decoded.id
        console.log(userId)

        const userData = await userService.getUserData(userId)
        console.log(userData)
        console.log(userData.type)
        const userType = userData.type

        if (userType === 'advisor') {
            var advisorId = userId
            console.log(advisorId)
            advisorClubs = await clubService.getClubsForAdvisor(advisorId)
            console.log(advisorClubs)
        }

        return advisorClubs
    }

    const fetchClubMembershipRequestsData = async () => {
        const advisorClubs = await fetchAdvisorClubs()
        console.log(advisorClubs) 
        //var numberOfClubMembershipRequests = []

        
        var clubMembershipRequests = advisorClubs.map(async club => {
            const clubMembershipRequests = await membershipService.getClubMembershipRequests(club._id)                  
            console.log(club._id)
            console.log(await clubMembershipRequests)
            
            await clubMembershipRequests.map(async membershipRequest => {
                var userData = await userService.getUserData(membershipRequest.userId);
                
                membershipRequest["userFirstName"] = userData.firstName
                membershipRequest["userLastName"] = userData.lastName
                membershipRequest["userEmail"] = userData.email
                console.log(membershipRequest.userFirstName)
                console.log(membershipRequest.userLastName)
                console.log(membershipRequest.userEmail)

            })

            return clubMembershipRequests
            })
        
        return Promise.all(clubMembershipRequests)
        }   
        
    

    useEffect(() => {
        setIsLoading(true)

        fetchData()
            .then((clubs) => {
                console.log(clubs);
                setClubs(clubs)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })

        fetchUserId()
            .then((userId) => {
                console.log(userId);
                setUserId(userId)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })

        fetchUserData()
            .then((userType) => {
                console.log(userType);
                setUserType(userType)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })
        fetchMemberships()
            .then((userMemberships) => {
                console.log(userMemberships);
                setUserMemberships(userMemberships)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })
    }, [])

    return {isLoading, clubs, userId, user, userType, userMemberships, advisorClubs, clubMembershipRequests, userMemberships}
}

const styles = StyleSheet.create({
    dashboardScreenStyle:{
        backgroundColor: appBackgroundColor,
        height: '100%',
    },
    base: {
        justifyContent: 'center',
        backgroundColor: appBackgroundColor,
    },
    buttonText: {
        fontFamily: appFont
    },
    card: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: appTextColor,
        borderRadius: 10,
        marginBottom: 30,
        width: '80%',
        shadowColor: '#5A5A5A',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 15
    },
    clubName: {
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
    searchDesign: {
        height: 40,
        backgroundColor: appBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        marginLeft: 15,
        color: appTextColor,
        fontFamily: appFont,
        flex: 1,
        outlineStyle: 'none'
    },
    feeInput: {
        width: '10%',
        height: 40,
        backgroundColor: appBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: appButtonColor,
        borderBottomWidth: 3,
        fontSize: 16,
        marginLeft: 15,
        color: appTextColor,
        fontFamily: appFont,
        flex: 2
    },
    clubDescription: {
        margin: 10,
        fontFamily: appFont,
        flexWrap: 'wrap'
    },
    dropdownStyle: {
        width: '50%',
        height: 40,
        backgroundColor: appBackgroundColor,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: appButtonColor,
        borderBottomWidth: 3,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 50,
        color: appTextColor,
        fontFamily: appFont,
        flex: 2
      },
      
    interestMeetingStyle: {
        marginTop: 20,
        marginHorizontal: 10,
        color: 'red',
        fontWeight: '600',
        fontFamily: appFont,
        flexWrap: 'wrap'
    },
    joinClubButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 50,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        margin: 10
    },
    createNewClubButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 150,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        margin: 50,
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 17,
    },
    viewClubInfoForAdvisor: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: appButtonColor,
        color: appTextColor,
        height: 30,
        width: 100,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        borderRadius: 3,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,

    },
    advisorName: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        fontFamily: appFont
    },
    registrationRequests: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        fontFamily: appFont,
        flexWrap: 'wrap'
    },
    advisorFunctionTest: {
        color: 'red',
        fontWeight: '600'
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
    searchFieldOverStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: appButtonColor,
        borderBottomWidth: 3,
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    clickImageStyle: {
        marginRight: 15
    }
});