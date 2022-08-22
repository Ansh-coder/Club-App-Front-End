import {StyleSheet, Text, View, useWindowDimensions, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'

export const DashboardScreen = () => {

    const {isLoading, lists} = loadData();
    var InterestMeeting

    const onJoinClub = () => {
        console.log('Club Joined!')
    }

    if (isLoading) return <Text>Loading...</Text>

    return <View>
        {lists.map(club => {
            if (club.interestMeetingRequired === true) {
                InterestMeeting = 'Interest Meeting Required'
            } else {
                InterestMeeting = null
            }
            console.log(club.advisorId.firstName)
            return (
                <ScrollView key={club._id} contentContainerStyle = {styles.card}>
                    <Text style = {styles.clubName}>{club.name}</Text>
                    <Text style = {styles.clubDescription}>{club.description}</Text>
                    <Text style = {styles.interestMeetingStyle}>{InterestMeeting}</Text>
                    <Text style = {styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                    <Text style = {styles.advisorName}>Advisor: {club.advisorId.firstName} {club.advisorId.lastName}</Text>
                    <TouchableOpacity
                        style = {InterestMeeting === 'Interest Meeting Required' ? styles.disabledJoinClubButton : styles.joinClubButton}
                        onPress = {onJoinClub}
                        disabled = {InterestMeeting === 'Interest Meeting Required'}>
                        <Text>Join Club</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        })}
    </View>
}

function loadData() {
    const [isLoading, setIsLoading] = useState(true)
    const [lists, setLists] = useState([])

    const fetchData = async () => {
        const loadClubs = async () => {
            const token = await AsyncStorage.getItem('token');
            const clubsJson = await fetch('http://localhost:3000/clubs', {
                headers: {
                    Authorization: 'jwt ' + token
                }
            })
            return clubsJson.json()
        }

        const retrieveAdvisorName = async (clubs) => {
            const token = await AsyncStorage.getItem('token');
            const apiRequests = clubs.map(club => {
               return fetch('http://localhost:3000/users/' + club.advisorId, {
                    headers: {
                        Authorization: 'jwt ' + token
                    }

                })
            });
            const responses = await Promise.all(apiRequests);
            const jsonResponses = responses.map(response => response.json());
            return await Promise.all(jsonResponses);
        }

        const clubs = await loadClubs();
        const users = await retrieveAdvisorName(clubs);
        const hydratedClubs = clubs.map(club => {
            club.advisorId = users.find(user => user._id === club.advisorId);
            return club;
        })

        return hydratedClubs;
    }

    useEffect(() => {
        setIsLoading(true)

        fetchData()
            .then((clubs) => {
                console.log(clubs);
                setLists(clubs)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })
    }, [])

    return {isLoading, lists}
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffde4',
        borderColor: '#000000',
        borderWidth: 3,
        borderRadius: 5,
        margin: '2.5%',
        width: '80%',
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
    disabledJoinClubButton: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#D3D3D3',
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
    }
});

export default DashboardScreen