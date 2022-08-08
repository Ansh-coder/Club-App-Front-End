import { StyleSheet, Text, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './MainScreenComponents/DashboardScreen';
import SettingsScreen from './MainScreenComponents/SettingsScreen';
import ProfileScreen from './MainScreenComponents/ProfileScreen';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator()

function MainScreen() {
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
          </Drawer.Navigator>
        </>
      )
  }

export default MainScreen

const styles = StyleSheet.create({

})