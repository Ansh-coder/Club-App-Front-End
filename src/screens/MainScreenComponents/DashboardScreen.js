import {StyleSheet, Text, View, useWindowDimensions, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import {ClubService} from "../../services/club.service";
import {UserService} from "../../services/user.service";

export const DashboardScreen = () => {

    const {isLoading, lists} = loadData();
    var InterestMeeting

    const onJoinClub = () => {
        console.log('Club Joined!')
    }

    if (isLoading) return <Text>Loading...</Text>
    if (lists === undefined) return <Text>Something went wrong</Text>
    if (lists.length === 0) return <Text>No Clubs Here</Text>

    return <View>

        {lists.map(club => {
            if (club.interestMeetingRequired === true) {
                InterestMeeting = 'Interest Meeting Required'
            } else {
                InterestMeeting = null
            }

            return (
                <ScrollView key={club._id} contentContainerStyle = {styles.card}>
                    <Text style = {styles.clubName}>{club.name}</Text>
                    <Text style = {styles.clubDescription}>{club.description}</Text>
                    <Text style = {styles.interestMeetingStyle}>{InterestMeeting}</Text>
                    <Text style = {styles.clubDescription}>Fee: ${club.fee.$numberDecimal}</Text>
                    {/*<Text style = {styles.clubDescription}>{club.advisorId.firstName}</Text>*/}
                    <TouchableOpacity
                        style = {styles.joinClubButton}
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

    const [isLoading, setIsLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const clubService = new ClubService();
    const userService = new UserService();

    const fetchData = async () => {
        const clubs = await clubService.list();
        const advisorIds = clubs.map(club => club.advisorId);
        const advisors = await userService.getUsersFromIds(advisorIds);

        const hydratedClubs = clubs.map(club => {
            club.advisorId = advisors.find(user => user._id === club.advisorId);
            return club;
        })

        return hydratedClubs;
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
    }, [])

    return {isLoading, clubs}
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
});

export default DashboardScreen