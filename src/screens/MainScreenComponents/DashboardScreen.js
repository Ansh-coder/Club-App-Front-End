import {StyleSheet, Text, View, useWindowDimensions, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import {ClubService} from "../../services/club.service";
import {UserService} from "../../services/user.service";
import jwtDecode from 'jwt-decode';
import { render } from 'react-dom';


export const DashboardScreen = () => {

    const {isLoading, clubs, userId, user, userType} = loadData();
    var token
    var InterestMeeting
    const fetchToken = async () => {
        token = await AsyncStorage.getItem('token');
        console.log(token)
    }
    fetchToken()

    console.log(userType)
    async function postData(url = '', data = {}) {
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

const AdvisorDashboard = async () => {
    console.log('you are an advisor!')

    return(
        <View>
            <Text style = {styles.advisorFunctionTest}>It works!</Text>
        </View>
    )
}
    
const StudentDashboard = async () => {
    console.log('You are a student!')
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
                
                postData('http://localhost:3000/memberships', { userId, clubId, interestMeetingAttended, paid })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    }).catch(error => console.log(error));
            }
            return (
                <ScrollView key={club._id} contentContainerStyle = {styles.card}>
                    <Text style = {styles.clubName}>{club.name}</Text>
                    <Text style = {styles.clubDescription}>{club.description}</Text>
                    <Text style = {styles.interestMeetingStyle}>{InterestMeeting}</Text>
                    <Text style = {styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                    <Text style = {styles.advisorName}>Advisor: {club.advisorId.firstName} {club.advisorId.lastName}</Text>
                    <TouchableOpacity
                        style = {styles.joinClubButton}
                        onPress = {onJoinClub}>
                        <Text>Join Club</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        })}
    </View>
}

    if (userType === 'student') {
        console.log('student')
        StudentDashboard()
    } else if (userType === 'advisor') {
        console.log('advisor')
        AdvisorDashboard()
    }



}

function loadData() {
    const [isLoading, setIsLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const clubService = new ClubService();
    const userService = new UserService();
    const [userId, setUserId] = useState([]);
    const [authToken, setAuthToken] = useState([])
    const [user, setUser] = useState([]);
    const [userType, setUserType] = useState([]);

    const fetchUserId = async () => {
        const token = await AsyncStorage.getItem('token')
        var decoded = jwtDecode(token)
        console.log(decoded)
        
        var userId = decoded.id
        console.log(userId)
        

        return userId
    }


    const fetchData = async () => {
        const clubs = await clubService.list();
        const advisorIds = clubs.map(club => club.advisorId);
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
    }, [])

    return {isLoading, clubs, userId, user, userType}
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

export default DashboardScreen