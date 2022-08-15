import {StyleSheet, Text, View, useWindowDimensions, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const DashboardScreen = () => {

    const {isLoading, lists} = loadData();

    if (isLoading) return <h2>Loading...</h2>

    return <div>
        {lists.map(club => {
            return (
              <div key={club._id} style = {styles.card}>
                    <h2>{club.name}</h2>
                    <h3>{club.description}</h3>
              </div>
            );
        })}
    </div>
}

function loadData() {
    const [isLoading, setIsLoading] = useState(true)
    const [lists, setLists] = useState(null)
    const load = async () => {
        const token = await AsyncStorage.getItem('token');
        const clubsJson = await fetch('http://localhost:3000/clubs', {
            headers: {
                Authorization: 'jwt ' + token
            }
        })
        return clubsJson.json()
    }

    useEffect(() => {
        setIsLoading(true)

        load()
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
        borderRadius: 10,
        margin: 20
    }
});

export default DashboardScreen