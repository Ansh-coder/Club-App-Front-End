import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import DashboardScreen from './MainScreenComponents/DashboardScreen';
import SettingsScreen from './MainScreenComponents/SettingsScreen';
import ProfileScreen from './MainScreenComponents/ProfileScreen';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AdvisorClubView } from './MainScreenComponents/Dashboard/AdvisorClubView';
import { NewClubScreen } from './MainScreenComponents/Dashboard/NewClubScreen';
import { appButtonColor, appTextColor, appFont } from '../UniversalAppDesignVars';

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






    return (
        <>
          <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => {
              return (
                  <DrawerContentScrollView {...props}>
                      <DrawerItemList {...props} />
                           <DrawerItem 
                           label = 'Sign Out' 
                           onPress={() => props.navigation.navigate("Log In")}
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
          </Drawer.Navigator>
        </>
      )
  }

export default MainScreen

const styles = StyleSheet.create({
    signUpButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appButtonColor,
        color: appTextColor,
        width: 150,
        height: 40,
        borderRadius: 2,
        fontFamily: appFont,
        fontSize: 16,
        right: 10,
        shadowColor: '#5A5A5A',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 17,
    },
    buttonText: {
        fontFamily: appFont
    }
})