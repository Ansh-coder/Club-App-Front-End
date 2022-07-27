import React from 'react';
import { FlatList, Platfrom, ScrollView, Slider, StatusBar, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from 'react-native';
// import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import SignInScreen from './src/screens/SignInScreen';
import LogInScreen from './src/screens/LogInScreen';
import TextInputField from './src/components/TextInputField';
import DashboardScreen from './src/screens/NextFunctionForApp';




const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <>
      
      <NavigationContainer >
        <Stack.Navigator initialRouteName = "Log In">
          <Stack.Screen name = "Log In" component = {LogInScreen}/>
          <Stack.Screen name = "Sign In" component = {SignInScreen}/>
          <Stack.Screen name = "Dashboard" component = {DashboardScreen}/>
          
        </Stack.Navigator>
      </NavigationContainer>

      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fffde4'
  }
  }


  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
);

