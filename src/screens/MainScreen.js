import { StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import DashboardScreen from './MainScreenComponents/DashboardScreen';
import SettingsScreen from './MainScreenComponents/SettingsScreen';
import ProfileScreen from './MainScreenComponents/ProfileScreen';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AdvisorClubView } from './MainScreenComponents/Dashboard/AdvisorClubView';
import { NewClubScreen } from './MainScreenComponents/Dashboard/NewClubScreen';
import { JoinClubScreen } from './MainScreenComponents/Dashboard/JoinClubScreen';
import { EditClubInfoScreen } from './MainScreenComponents/Dashboard/EditClubInfoScreen';
import { appButtonColor, appTextColor, appFont, appBackgroundColor } from '../UniversalAppDesignVars';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator()

function MainScreen({navigation}) {
const iconSize = 24
const iconColor = 'insert icon color here'
function logOutIcon () {
    <MaterialIcons
    name="face"
    size = {iconSize}
    color = 'black'
    />
}

const {userData, isLoading} = loadData()
console.log(userData)







    return (
        <>
          <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => {
              return (
                  <DrawerContentScrollView {...props}>
                      <DrawerItemList {...props} />
                           <DrawerItem 
                           label = 'Sign Out' 
                           
                           onPress={() => navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [
                                { name: 'Log In' },
                              ],
                            })
                          )}
                           />
                    </DrawerContentScrollView>
              )
  }}>
            <Drawer.Screen name = 'Dashboard' component={DashboardScreen}
                options = {{
                    drawerIcon: () => (
                        <Ionicons
                          name="home-outline"
                          size = {iconSize}
                          color = 'black'
                        />
                    ),
                    headerRight: () => (
                      <Text style = {styles.welcomeStyle}>Welcome, {userData.name}!</Text>
                  )
                }}
            />
            <Drawer.Screen name = 'Settings' component={SettingsScreen}
                options = {{
                    drawerIcon: () => (
                        <Ionicons
                          name="settings-outline"
                          size = {iconSize}
                          color = 'black'
                        />
                    )
                }}
            />
            <Drawer.Screen name = 'Profile' component={ProfileScreen}
                options = {{
                    drawerIcon: () => (
                        <MaterialIcons
                          name="face"
                          size = {iconSize}
                          color = 'black'
                        />
                    )
                }}
            />
            <Drawer.Screen name = "Advisor Club View"  component={AdvisorClubView}
                options = {{
                    drawerItemStyle: { height: 0 },
                    title: "",
                    headerRight: () => (
                        <TouchableOpacity 
                        style = {styles.signUpButton}
                        onPress={() =>
                            navigation.dispatch(
                              CommonActions.reset({
                                index: 1,
                                routes: [
                                  {
                                    name: 'Advisor Club View',
                                  },
                                  { name: 'Dashboard' },
                                ],
                              })
                            )
                          }
                        >
                            <Text style = {styles.buttonText}>Return to Dashboard</Text>
                      </TouchableOpacity>
                    )
                }}
            />
            <Drawer.Screen name = "New Club Screen"  component={NewClubScreen}
                options = {{
                    drawerItemStyle: { height: 0 },
                    title: "",
                    headerRight: () => (
                        <TouchableOpacity 
                        style = {styles.signUpButton}
                        onPress={() =>
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
                        >
                            <Text style = {styles.buttonText}>Return to Dashboard</Text>
                      </TouchableOpacity>
                    )
                }}
            />
            <Drawer.Screen name = "Join Club Screen"  component={JoinClubScreen}
                options = {{
                    drawerItemStyle: { height: 0 },
                    title: "",
                    headerRight: () => (
                        <TouchableOpacity 
                        style = {styles.signUpButton}
                        onPress={() =>
                            navigation.dispatch(
                              CommonActions.reset({
                                index: 1,
                                routes: [
                                  {
                                    name: 'Join Club Screen',
                                  },
                                  { name: 'Dashboard' },
                                ],
                              })
                            )
                          }
                        >
                            <Text style = {styles.buttonText}>Return to Dashboard</Text>
                      </TouchableOpacity>
                    )
                }}
            />
            <Drawer.Screen name = "Edit Club Screen"  component={EditClubInfoScreen}
                options = {{
                    drawerItemStyle: { height: 0 },
                    title: "",
                    headerRight: () => (
                      <TouchableOpacity 
                      style = {styles.signUpButton}
                      onPress={() =>
                          navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [
                                {
                                  name: 'Edit Club Screen',
                                },
                                { name: 'Dashboard' },
                              ],
                            })
                          )
                        }
                      >
                            <Text style = {styles.buttonText}>Return to Dashboard</Text>
                      </TouchableOpacity>
                    )
                }}
            />
          </Drawer.Navigator>
        </>
      )
  }

  function loadData() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserId = async () => {
        const token = await AsyncStorage.getItem('token')
        var userData = jwtDecode(token)


        return userData
    }

   
        
    

    useEffect(() => {
        setIsLoading(true)

        fetchUserId()
            .then((userData) => {
                console.log(userData);
                setUserData(userData)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                return setIsLoading(false)
            })


    }, [])

    return {userData, isLoading}
}
  
export default MainScreen

const styles = StyleSheet.create({
    signUpButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appButtonColor,
        color: appTextColor,
        padding: 10,
        height: 40,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        right: 10,
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 17,
    },
    welcomeStyle: {
      justifyContent: "center",
      alignItems: "center",
      color: appBackgroundColor,
      fontFamily: appFont,
      marginRight: '4%',
      textShadowColor: appBackgroundColor,
      fontSize: 20,
      fontWeight: '500',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 15,
  },
    buttonText: {
        fontFamily: appFont
    },
})