import {StyleSheet, Text, View, useWindowDimensions, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LinearGradient} from 'expo-linear-gradient'
import {ClubService} from "../../services/club.service";
import {UserService} from "../../services/user.service";
import jwtDecode from 'jwt-decode';
import {render} from 'react-dom';
import {MembershipService} from "../../services/membership.service"


export const DashboardScreen = () => {
    const {isLoading, clubs, userId, user, userType, clubsUserRegisterdFor, advisorClubs} = loadData();
    var token
    var InterestMeeting
    const fetchToken = async () => {
        token = await AsyncStorage.getItem('token');
        console.log(token)
    }
    fetchToken()

    console.log(userType)

    if (isLoading) return <Text>Loading...</Text>

    if (clubs === undefined) return <Text>Something went wrong</Text>
    if (clubs.length === 0) return <Text>No Clubs Here</Text>
    console.log(userId)
    console.log(user)
    if (userType === 'student') {
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
                    console.log(userId)
                    console.log(clubId)

                    if(clubsUserRegisterdFor.includes(clubId)) {
                        console.log("Club Already Registered For")
                    } else {
                        postData('http://localhost:3000/memberships', {userId, clubId, interestMeetingAttended, paid}, token)
                        .then((data) => {
                            console.log(data); // JSON data parsed by `data.json()` call
                        }).catch(error => console.log(error));

                        clubsUserRegisterdFor.push(clubId)
                    }
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
    } else {
        console.log(advisorClubs)
        return <View>
            {advisorClubs.map(club => {
                console.log('Mapping through club variable for advisor')


                const onViewClubInfo = () => {
                    console.log('Viewing club info')
                    }
                return (
                    <ScrollView key={club._id} contentContainerStyle={styles.card}>
                        <Text style={styles.clubName}>{club.name}</Text>
                        <Text style={styles.clubDescription}>{club.description}</Text>
                        <Text style={styles.interestMeetingStyle}>{InterestMeeting}</Text>
                        <Text style={styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                        <TouchableOpacity
                            style={styles.viewClubInfoForAdvisor}
                            onPress={onViewClubInfo}>
                            <Text>Join Club</Text>
                        </TouchableOpacity>
                    </ScrollView>
                );
            })}
        </View>
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
        var advisorClubs;
        


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
    }, [])

    return {isLoading, clubs, userId, user, userType, clubsUserRegisterdFor, advisorClubs}
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffde4',
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 10,
        margin: '2.5%',
        width: '80%'
    },
    clubName: {
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: '800'
    },
    clubDescription: {
        margin: 10
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
        backgroundColor: '#CD8B49',
        color: "#FFFFFF",
        height: 30,
        borderRadius: 2,
        fontFamily: 'Futura',
        fontSize: 16,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    viewClubInfoForAdvisor: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#CD8B49',
        color: "#FFFFFF",
        height: 30,
        borderRadius: 2,
        fontFamily: 'Futura',
        fontSize: 16,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    advisorName: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10
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

async function postData(url = '', data = {}, token) {
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
}

export default DashboardScreen