import {StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ClubService} from "../../services/club.service";
import {UserService} from "../../services/user.service";
import jwtDecode from 'jwt-decode';
import {MembershipService} from "../../services/membership.service"
import { appBackgroundColor, appButtonColor, appTextColor, appFont } from '../../UniversalAppDesignVars';




export const DashboardScreen = ({navigation}) => {
    const {isLoading, clubs, userId, user, userType, clubsUserRegisterdFor, advisorClubs, clubMembershipRequests} = loadData();
    const membershipService = new MembershipService();
    var token
    var InterestMeeting
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

    console.log(userType)

    if (isLoading) return (
    <View style = {styles.dashboardScreenStyle}>
    <Text style = {styles.buttonText}>Loading...</Text>
    </View>
    )

    if (clubs === undefined) return (
            <View style = {styles.dashboardScreenStyle}>
                <Text style = {styles.buttonText}>Something went wrong.</Text>
            </View>
        )
    if (clubs.length === 0) return (
            <View style = {styles.dashboardScreenStyle}>
                <Text style = {styles.buttonText}>No clubs here yet.</Text>
            </View>
        )
    console.log(userId)
    console.log(user)
    if (userType === 'student') {
        return <View style = {styles.dashboardScreenStyle}>
            {clubs.map(club => {
                console.log('Mapping through club variables')
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

                console.log(clubId)



                const onJoinClub = () => {
                    console.log(userId)
                    console.log(clubId)

                    if(clubsUserRegisterdFor.includes(clubId)) {
                        console.log("Club Already Registered For")
                    } else {
                        postData('http://localhost:3000/memberships', {userId, clubId, interestMeetingAttended, paid})
                        .then((data) => {
                            console.log(data); // JSON data parsed by `data.json()` call
                        }).catch(error => console.log(error));

                        clubsUserRegisterdFor.push(clubId)
                    }
                    }
                return (
                    <View key = {club._id} style = {styles.base}>
                    <ScrollView key={club._id} contentContainerStyle={styles.card}>
                        <Text style={styles.clubName}>{club.name}</Text>
                        <Text style={styles.clubDescription}>{club.description}</Text>
                        <Text style={styles.interestMeetingStyle}>{InterestMeeting}</Text>
                        <Text style={styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                        {/*<Text style={styles.advisorName}>Advisor: {club.advisorId.firstName} {club.advisorId.lastName}</Text>*/}
                        <TouchableOpacity
                            style={styles.viewClubInfoForAdvisor}
                            onPress={onJoinClub}>
                            <Text style = {styles.buttonText}>Join Club</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
                );
            })}
        </View>
    } else {
        console.log(advisorClubs)

        console.log(clubMembershipRequests)
        var numberOfClubMembershipRequests = [];
        clubMembershipRequests.map(club => {
            var activeMembershipRequests = 0;
            club.map(membershipRequest => {
                if(membershipRequest.registered == false) {
                    activeMembershipRequests++;
                }
            })
            numberOfClubMembershipRequests.push(activeMembershipRequests)
        })

        console.log(numberOfClubMembershipRequests)
        for (var i = 0; i < advisorClubs.length; i++) {
            Object.assign(advisorClubs[i], {'numberOfMembershipRequests': numberOfClubMembershipRequests[i]})
        }

        console.log(advisorClubs)
        var mapRound = 0;
        return <SafeAreaView style = {styles.dashboardScreenStyle}>
            {advisorClubs.map(club => {
                console.log(club)
                console.log('Mapping through club variable for advisor')
                /*console.log(club)
                console.log(club._id)
                var clubMembershipRequestsIndex = numberOfClubMembershipRequests.indexOf(club.numberOfMembershipRequests)
                console.log(clubMembershipRequestsIndex)
                
                var clubMembershipData = clubMembershipRequests[clubMembershipRequestsIndex]
                console.log(clubMembershipData)*/
                
                console.log(clubMembershipRequests[mapRound])
                console.log(mapRound)
                var clubMembershipData = clubMembershipRequests[mapRound]
                var clubData = advisorClubs[mapRound]
                mapRound++;
                console.log(club.name)

                /*const onViewClubInfo = (clubId) => {
                    navigation.navigate("Advisor Club View")
                }*/

                //console.log('Number of Registration Requests ' + numberOfClubMembershipRequests)
                
                return (
                    <View key = {club._id} style = {styles.base}>
                    <ScrollView key={club._id} contentContainerStyle={styles.card}>
                        <Text style={styles.clubName}>{club.name}</Text>
                        <Text style={styles.clubDescription}>{club.description}</Text>
                        <Text style={styles.interestMeetingStyle}>{InterestMeeting}</Text>
                        <Text style={styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                        <Text style={styles.registrationRequests}>Registration Requests Pending: {club.numberOfMembershipRequests}</Text>
                        <TouchableOpacity
                            style={styles.viewClubInfoForAdvisor}
                            onPress={() => 
                                {
                                navigation.navigate("Advisor Club View", {
                                    clubMembershipData: clubMembershipData,
                                    clubData: clubData
                                })
                                console.log(clubMembershipData)
                                console.log(clubData)
                                }}>
                            <Text style = {styles.buttonText}>View Club</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
                );
            })}
            <View style = {styles.base}>
                <TouchableOpacity
                    style={styles.createNewClubButton}
                    onPress={() => navigation.navigate("New Club Screen")}>
                    <Text style = {styles.buttonText}>Create a New Club</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    }

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

        return clubsUserRegisterdFor
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
            .then((clubsUserRegisterdFor) => {
                console.log(clubsUserRegisterdFor);
                setClubsUserRegisterdFor(clubsUserRegisterdFor)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })
        fetchAdvisorClubs()
            .then((advisorClubs) => {
                console.log(advisorClubs);
                setAdvisorClubs(advisorClubs)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })
        fetchClubMembershipRequestsData()
            .then((clubMembershipRequests) => {
                console.log(clubMembershipRequests);
                console.log('Function is working, but clubMembershipRequests is null');
                setClubMembershipRequests(clubMembershipRequests)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })
    }, [])

    return {isLoading, clubs, userId, user, userType, clubsUserRegisterdFor, advisorClubs, clubMembershipRequests}
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
        margin: '3%',
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
    clubDescription: {
        margin: 10,
        fontFamily: appFont,
        flexWrap: 'wrap'
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
    }
});

async function AdvisorDashboard() {
    console.log('you are an advisor!')

    return (
        <View>
            <Text style={styles.advisorFunctionTest}>It works!</Text>
        </View>
    )
}

async function StudentDashboard(isLoading) {
    console.log('You are a student!')
    let InterestMeeting = '';
    if (isLoading) return <Text>Loading...</Text>

    if (clubs === undefined) return <Text>Something went wrong</Text>
    if (clubs.length === 0) return <Text>No Clubs Here</Text>
    console.log(userId)
    console.log(user)
    return <View>


        {clubs.map(club => {
            console.log('Mapping through club variables')
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

            console.log(clubId)


            const onJoinClub = () => {
                console.log('Club Joined!')
                console.log(userId)
                console.log(clubId)

                postData('http://localhost:3000/memberships', {userId, clubId, interestMeetingAttended, paid}, token)
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    }).catch(error => console.log(error));
            }
            return (
                <ScrollView key={club._id} contentContainerStyle={styles.card}>
                    <Text style={styles.clubName}>{club.name}</Text>
                    <Text style={styles.clubDescription}>{club.description}</Text>
                    <Text style={styles.interestMeetingStyle}>{InterestMeeting}</Text>
                    <Text style={styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                    <Text
                        style={styles.advisorName}>Advisor: {club.advisorId.firstName} {club.advisorId.lastName}</Text>
                    <TouchableOpacity
                        style={styles.joinClubButton}
                        onPress={onJoinClub}>
                        <Text>Join Club</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        })}
    </View>
}

/*async function postData(url = '', data = {}, token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
}*/

export default DashboardScreen